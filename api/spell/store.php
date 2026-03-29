<?php
require_once '../cors.php';
require_once '../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Метод не поддерживается'], JSON_UNESCAPED_UNICODE);
    exit;
}

$payload = json_decode(file_get_contents('php://input'), true);
$name = trim($payload['name'] ?? '');

if ($name === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Название обязательно'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare('INSERT INTO spell (name) VALUES (:name)');
    $stmt->execute(['name' => $name]);

    echo json_encode([
        'id' => (int) $pdo->lastInsertId(),
        'name' => $name,
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    if (($e->errorInfo[0] ?? null) === '23000') {
        http_response_code(409);
        echo json_encode(['error' => 'Такое заклинание уже существует'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
