<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check if the request method is PUT
if ($_SERVER['REQUEST_METHOD'] === 'PUT') {
    // Assuming you pass the StoreID and new data in the request body
    $requestData = json_decode(file_get_contents('php://input'), true);
    
    $storeIdToUpdate = isset($requestData['store_id']) ? $requestData['store_id'] : null;
    $newStoreName = isset($requestData['new_store_name']) ? $requestData['new_store_name'] : null;
    $newCategory = isset($requestData['new_category']) ? $requestData['new_category'] : null;
    $newIsActive = isset($requestData['new_is_active']) ? $requestData['new_is_active'] : null;

    if ($storeIdToUpdate && ($newStoreName || $newCategory || $newIsActive)) {
        $updateClause = "";

        if ($newStoreName) {
            $updateClause .= "StoreName = '$newStoreName', ";
        }

        if ($newCategory) {
            $updateClause .= "Category = '$newCategory', ";
        }

        if ($newIsActive) {
            $updateClause .= "IsActive = $newIsActive, ";
        }

        // Remove trailing comma and space
        $updateClause = rtrim($updateClause, ", ");

        $sql = "UPDATE store SET $updateClause WHERE StoreID = $storeIdToUpdate";
        $result = $conn->query($sql);

        if ($result !== false) {
            // Check the number of affected rows
            $affectedRows = $conn->affected_rows;
        
            if ($affectedRows > 0) {
                echo json_encode(array('message' => 'Store updated successfully'));
            } else {
                echo json_encode(array('error' => 'Store with specified ID not found'));
            }
        } else {
            echo json_encode(array('error' => 'Failed to update store. MySQL Error: ' . $conn->error));
        }
    } else {
        echo json_encode(array('error' => 'Invalid or missing parameters for store update'));
    }
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

?>
<!-- {
    "store_id": 1,
    "new_store_name": "Updated Store Name",
    "new_category": "Updated Category",
    "new_is_active": 1
} -->