<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    $data = json_decode(file_get_contents('php://input'), true);
    $ProductID = $data['ProductID'];
    
    if (isset($ProductID)) {
        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("DELETE FROM product WHERE ProductID = ?");
        $stmt->bind_param("i", $ProductID);

        // Execute the statement
        if ($stmt->execute()) {
            $response = array('success' => true, 'message' => 'Product deleted successfully');
            echo json_encode($response);
        } else {
            $response = array('success' => false, 'message' => 'Failed to delete product');
            echo json_encode($response);
        }

        // Close the statement
        $stmt->close();
    } else {
        $response = array('success' => false, 'message' => 'No data sent');
        echo json_encode($response);
    }
} else {
    $response = array('success' => false, 'message' => 'Invalid method. Use DELETE');
    echo json_encode($response);
}


