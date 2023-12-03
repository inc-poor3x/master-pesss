<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    if (isset($data['categoryID'])) {
        $categoryID = $data['categoryID'];

        // Check if the category with the given ID exists before deleting
        $checkStmt = $conn->prepare("SELECT * FROM category WHERE categoryID = ?");
        $checkStmt->bind_param("i", $categoryID);
        $checkStmt->execute();
        $checkStmt->store_result();

        if ($checkStmt->num_rows > 0) {
            // Use prepared statement to prevent SQL injection
            $deleteStmt = $conn->prepare("DELETE FROM category WHERE categoryID = ?");
            $deleteStmt->bind_param("i", $categoryID);

            if ($deleteStmt->execute()) {
                echo json_encode(array("message" => "Category deleted successfully"));
            } else {
                echo json_encode(array("message" => "Failed to delete category: " . $deleteStmt->error));
            }

            $deleteStmt->close();
        } else {
            echo json_encode(array("message" => "Category with ID $categoryID does not exist"));
        }

        $checkStmt->close();
    } else {
        echo json_encode(array("message" => "Category ID not provided"));
    }
} else {
    echo json_encode(array("message" => "Invalid request method"));
}
?>
