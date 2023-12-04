<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required fields are set
    if (isset($data['RatingID'])) {
        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("DELETE FROM rating WHERE RatingID = ?");
        $stmt->bind_param("i", $data['RatingID']);

        if ($stmt->execute()) {
            echo "Review deleted successfully";
        } else {
            echo "Review not deleted: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Required fields not set";
    }
} else {
    echo "Request method false";
}
