<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if storeID is provided in the JSON data
    if (isset($data['storeID'])) {
        $storeID = $data['storeID'];

        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("SELECT * FROM product WHERE storeID = ?");
        $stmt->bind_param("i", $storeID);

        if ($stmt->execute()) {
            // Get result set
            $result = $stmt->get_result();

            if ($result && $result->num_rows > 0) {
                $responseData = $result->fetch_all(MYSQLI_ASSOC);
                echo json_encode(['success' => true, 'data' => $responseData]);
            } else {
                http_response_code(404); // Not Found
                echo json_encode(['success' => false, 'message' => "No products available for the specified storeID"]);
            }
        } else {
            http_response_code(500); // Internal Server Error
            echo json_encode(['success' => false, 'message' => "Error executing query: " . $stmt->error]);
        }

        // Close the statement
        $stmt->close();
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => "storeID parameter is required in the JSON data"]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => "The request method is wrong"]);
}
?>

