<?php
$envPath = __DIR__ . '/../.env';

if (!file_exists($envPath)) {
    http_response_code(500);
    echo json_encode(['error' => 'Файл .env не найден'], JSON_UNESCAPED_UNICODE);
    exit;
}

$env = parse_ini_file($envPath);
if ($env === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Не удалось прочитать .env'], JSON_UNESCAPED_UNICODE);
    exit;
}

$required = ['DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASS'];
foreach ($required as $key) {
    if (!array_key_exists($key, $env)) {
        http_response_code(500);
        echo json_encode(['error' => "Отсутствует параметр {$key} в .env"], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$dsn = sprintf(
    'mysql:host=%s;port=%s;dbname=%s;charset=utf8mb4',
    $env['DB_HOST'],
    $env['DB_PORT'],
    $env['DB_NAME']
);

try {
    $pdo = new PDO($dsn, $env['DB_USER'], $env['DB_PASS'], [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка подключения: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
    exit;
}
