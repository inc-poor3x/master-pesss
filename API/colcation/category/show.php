<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    $result = $conn->query("SELECT * FROM category");

    if ($result) {
        $categories = array();

        while ($row = $result->fetch_assoc()) {
            $categories[] = $row;
        }

        echo json_encode($categories);
    } else {
        echo json_encode(array("message" => "Failed to retrieve categories: " . $conn->error));
    }
} else {
    echo json_encode(array("message" => "Invalid request method"));
}
?>
