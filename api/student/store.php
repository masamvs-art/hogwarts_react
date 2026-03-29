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
$surname = trim($payload['surname'] ?? '');
$house = trim($payload['house'] ?? '');
$courseRaw = $payload['course'] ?? null;
$isDeletedRaw = $payload['is_deleted'] ?? 0;

if ($name === '' || $surname === '' || $house === '') {
    http_response_code(422);
    echo json_encode(['error' => 'Поля name, surname и house обязательны'], JSON_UNESCAPED_UNICODE);
    exit;
}

$allowedHouses = ['Гриффиндор', 'Слизерин', 'Когтевран', 'Пуффендуй'];
if (!in_array($house, $allowedHouses, true)) {
    http_response_code(422);
    echo json_encode(['error' => 'Некорректный факультет'], JSON_UNESCAPED_UNICODE);
    exit;
}

$course = null;
if ($courseRaw !== null && $courseRaw !== '') {
    $course = filter_var($courseRaw, FILTER_VALIDATE_INT);
    if ($course === false || $course < 1 || $course > 7) {
        http_response_code(422);
        echo json_encode(['error' => 'Курс должен быть от 1 до 7'], JSON_UNESCAPED_UNICODE);
        exit;
    }
}

$isDeleted = filter_var($isDeletedRaw, FILTER_VALIDATE_INT);
if ($isDeleted === false || !in_array($isDeleted, [0, 1], true)) {
    http_response_code(422);
    echo json_encode(['error' => 'is_deleted должен быть 0 или 1'], JSON_UNESCAPED_UNICODE);
    exit;
}

try {
    $stmt = $pdo->prepare(
        'INSERT INTO student (name, surname, house, course, is_deleted) VALUES (:name, :surname, :house, :course, :is_deleted)'
    );
    $stmt->bindValue(':name', $name);
    $stmt->bindValue(':surname', $surname);
    $stmt->bindValue(':house', $house);
    $stmt->bindValue(':course', $course, $course === null ? PDO::PARAM_NULL : PDO::PARAM_INT);
    $stmt->bindValue(':is_deleted', $isDeleted, PDO::PARAM_INT);
    $stmt->execute();

    echo json_encode([
        'id' => (int) $pdo->lastInsertId(),
        'name' => $name,
        'surname' => $surname,
        'house' => $house,
        'course' => $course,
        'is_deleted' => $isDeleted,
        'spell_count' => 0,
    ], JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
