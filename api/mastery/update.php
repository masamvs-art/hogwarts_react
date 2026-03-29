<?php
require_once '../cors.php';
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$id = filter_var($payload['id'] ?? null, FILTER_VALIDATE_INT);
$studentId = filter_var($payload['student_id'] ?? null, FILTER_VALIDATE_INT);
$spellId = filter_var($payload['spell_id'] ?? null, FILTER_VALIDATE_INT);

if (!$id || $id < 1 || !$studentId || $studentId < 1 || !$spellId || $spellId < 1) {
    http_response_code(422);
    echo json_encode(['error' => 'Некорректные данные'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare('UPDATE mastery SET student_id = :student_id, spell_id = :spell_id WHERE id = :id');
    $stmt->execute([
        'id' => $id,
        'student_id' => $studentId,
        'spell_id' => $spellId,
    ]);

    if ($stmt->rowCount() === 0) {
        $check = $pdo->prepare('SELECT id FROM mastery WHERE id = :id LIMIT 1');
        $check->execute(['id' => $id]);
        if (!$check->fetch()) {
            http_response_code(404);
            echo json_encode(['error' => 'Запись не найдена'], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    echo json_encode([
        'id' => $id,
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
