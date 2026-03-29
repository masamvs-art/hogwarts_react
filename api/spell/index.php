<?php
require_once '../cors.php';
require_once '../config.php';

try {
    $stmt = $pdo->query('SELECT id, name FROM spell ORDER BY name');
    echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
