<?php
require_once '../cors.php';
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$studentId = filter_var($payload['student_id'] ?? null, FILTER_VALIDATE_INT);
$spellId = filter_var($payload['spell_id'] ?? null, FILTER_VALIDATE_INT);

if (!$studentId || $studentId < 1 || !$spellId || $spellId < 1) {
    http_response_code(422);
    echo json_encode(['error' => 'Некорректные данные'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO mastery (student_id, spell_id) VALUES (:student_id, :spell_id)');
    $stmt->execute([
        'student_id' => $studentId,
        'spell_id' => $spellId,
    ]);

    echo json_encode([
        'id' => (int) $pdo->lastInsertId(),
        'student_id' => $studentId,
        'spell_id' => $spellId,
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    if (($e->errorInfo[0] ?? null) === '23000') {
        http_response_code(409);
        echo json_encode(['error' => 'Такая связь уже существует'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
