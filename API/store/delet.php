<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Check if the request method is DELETE
if ($_SERVER['REQUEST_METHOD'] === 'DELETE') {
    // Assuming you pass the StoreID in the request URL
    $storeIdToDelete = isset($_GET['store_id']) ? $_GET['store_id'] : null;

    if ($storeIdToDelete) {
        $sql = "DELETE FROM store WHERE StoreID = $storeIdToDelete";
        $result = $conn->query($sql);

        if ($result) {
            echo json_encode(array('message' => 'Store deleted successfully'));
        } else {
            echo json_encode(array('error' => 'Failed to delete store'));
        }
    } else {
        echo json_encode(array('error' => 'StoreID parameter is missing'));
    }
} else {
    echo json_encode(array('error' => 'Invalid request method'));
}

?>


<!-- parameter
{
"store_id":"7"
} -->