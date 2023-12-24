<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required fields are set
    if (
        isset($_GET['UserID']) &&
        isset($_GET['ProductID']) &&
        isset($data['RatingValue']) &&
        isset($data['Comment'])
    ) {
        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO rating (UserID, ProductID, RatingValue, Comment) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("iiis", $_GET['UserID'], $_GET['ProductID'], $data['RatingValue'], $data['Comment']);

        if ($stmt->execute()) {
            echo json_encode(array("status" => "success", "message" => "Review successfully inserted", "data" => $data));
        } else {
            echo json_encode(array("status" => "error", "message" => "Review not inserted: " . $stmt->error));
        }

        // Close the statement
        $stmt->close();
    } else {
        echo json_encode(array("status" => "error", "message" => "Required fields not set"));
    }
} else {
    echo json_encode(array("status" => "error", "message" => "Invalid request method"));
}
?>
