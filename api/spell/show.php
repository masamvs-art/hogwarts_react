<?php
require_once '../cors.php';
require_once '../config.php';

$id = filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
if (!$id || $id < 1) {
    http_response_code(400);
    echo json_encode(['error' => 'Некорректный id'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare('SELECT id, name FROM spell WHERE id = :id LIMIT 1');
    $stmt->execute(['id' => $id]);
    $spell = $stmt->fetch();

    if (!$spell) {
        http_response_code(404);
        echo json_encode(['error' => 'Заклинание не найдено'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode($spell, JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
