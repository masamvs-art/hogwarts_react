<?php
require_once '../cors.php';
require_once '../config.php';

$filters = [];
$params = [];

$name = trim($_GET['name'] ?? '');
if ($name !== '') {
    $filters[] = 'name LIKE :name';
    $params['name'] = '%' . $name . '%';
}

$surname = trim($_GET['surname'] ?? '');
if ($surname !== '') {
    $filters[] = 'surname LIKE :surname';
    $params['surname'] = '%' . $surname . '%';
}

$house = trim($_GET['house'] ?? '');
if ($house !== '') {
    $filters[] = 'house = :house';
    $params['house'] = $house;
}

if (array_key_exists('course', $_GET) && $_GET['course'] !== '') {
    $course = filter_var($_GET['course'], FILTER_VALIDATE_INT);
    if ($course === false || $course < 1 || $course > 7) {
        http_response_code(422);
        echo json_encode(['error' => 'Некорректный course'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $filters[] = 'course = :course';
    $params['course'] = $course;
}

if (array_key_exists('is_deleted', $_GET) && $_GET['is_deleted'] !== '') {
    $isDeleted = filter_var($_GET['is_deleted'], FILTER_VALIDATE_INT);
    if ($isDeleted === false || !in_array($isDeleted, [0, 1], true)) {
        http_response_code(422);
        echo json_encode(['error' => 'Некорректный is_deleted'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $filters[] = 'is_deleted = :is_deleted';
    $params['is_deleted'] = $isDeleted;
}

$sql = 'SELECT id, name, surname, house, course, is_deleted, spell_count FROM student';
if (!empty($filters)) {
    $sql .= ' WHERE ' . implode(' AND ', $filters);
}
$sql .= ' ORDER BY surname, name';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
