<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['Category_name'])) {
        $categoryName = $data['Category_name'];

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO category (Category_name) VALUES (?)");
        $stmt->bind_param("s", $categoryName);

        if ($stmt->execute()) {
            echo json_encode(array("message" => "Category added successfully"));
        } else {
            echo json_encode(array("message" => "Failed to add category: " . $stmt->error));
        }

        $stmt->close();
    } else {
        echo json_encode(array("message" => "Category name not provided"));
    }
} else {
    echo json_encode(array("message" => "Invalid request method"));
}
?>
