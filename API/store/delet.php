<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Get JSON data from the request body
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if the required parameter 'store_id' is present in the JSON data
    $storeIdToDelete = isset($data['store_id']) ? $data['store_id'] : null;

    if ($storeIdToDelete) {
        $sql = "DELETE FROM store WHERE StoreID = $storeIdToDelete";
        $result = $conn->query($sql);

        if ($result) {
            if ($conn->affected_rows > 0) {
                echo json_encode(array('message' => 'Store deleted successfully'));
            } else {
                echo json_encode(array('error' => 'Store not found for deletion'));
            }
        } else {
            echo json_encode(array('error' => 'Failed to delete store'));
        }
    } else {
        echo json_encode(array('error' => 'store_id parameter is missing or invalid'));
    }
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

?>
