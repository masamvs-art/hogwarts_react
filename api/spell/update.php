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
$name = trim($payload['name'] ?? '');

if (!$id || $id < 1 || $name === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Некорректные данные'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $update = $pdo->prepare('UPDATE spell SET name = :name WHERE id = :id');
    $update->execute([
        'id' => $id,
        'name' => $name,
    ]);

    if ($update->rowCount() === 0) {
        $exists = $pdo->prepare('SELECT id FROM spell WHERE id = :id LIMIT 1');
        $exists->execute(['id' => $id]);
        if (!$exists->fetch()) {
            http_response_code(404);
            echo json_encode(['error' => 'Заклинание не найдено'], JSON_UNESCAPED_UNICODE);
            exit;
        }
    }

    echo json_encode([
        'id' => (int) $id,
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
