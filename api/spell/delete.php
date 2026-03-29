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

if (!$id || $id < 1) {
    http_response_code(422);
    echo json_encode(['error' => 'Некорректный id'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare('DELETE FROM spell WHERE id = :id');
    $stmt->execute(['id' => $id]);

    if ($stmt->rowCount() === 0) {
        http_response_code(404);
        echo json_encode(['error' => 'Заклинание не найдено'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    echo json_encode(['success' => true], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
