<?php
require_once '../cors.php';
require_once '../config.php';

$filters = [];
$params = [];

if (array_key_exists('student_id', $_GET) && $_GET['student_id'] !== '') {
    $studentId = filter_var($_GET['student_id'], FILTER_VALIDATE_INT);
    if ($studentId === false || $studentId < 1) {
        http_response_code(422);
        echo json_encode(['error' => 'Некорректный student_id'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $filters[] = 'm.student_id = :student_id';
    $params['student_id'] = $studentId;
}

if (array_key_exists('spell_id', $_GET) && $_GET['spell_id'] !== '') {
    $spellId = filter_var($_GET['spell_id'], FILTER_VALIDATE_INT);
    if ($spellId === false || $spellId < 1) {
        http_response_code(422);
        echo json_encode(['error' => 'Некорректный spell_id'], JSON_UNESCAPED_UNICODE);
        exit;
    }

    $filters[] = 'm.spell_id = :spell_id';
    $params['spell_id'] = $spellId;
}

$sql = "SELECT m.id,
               CONCAT(s.name, ' ', s.surname) AS student_name,
               sp.name AS spell_name
        FROM mastery m
        JOIN student s ON s.id = m.student_id
        JOIN spell sp ON sp.id = m.spell_id";

if (!empty($filters)) {
    $sql .= ' WHERE ' . implode(' AND ', $filters);
}

$sql .= ' ORDER BY s.surname, sp.name';

try {
    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    echo json_encode($stmt->fetchAll(), JSON_UNESCAPED_UNICODE);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Ошибка запроса: ' . $e->getMessage()], JSON_UNESCAPED_UNICODE);
}
