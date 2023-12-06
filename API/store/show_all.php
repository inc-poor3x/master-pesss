<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Check if a specific storeID is provided
    if (isset($_GET['storeID'])) {
        $storeId = $_GET['storeID'];

        // Use prepared statement to prevent SQL injection
        $sql = "SELECT * FROM `store` WHERE `StoreID` = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $storeId);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $storeData = $result->fetch_assoc();
            echo json_encode($storeData);
        } else {
            echo json_encode(["error" => "Store not found"]);
        }

        $stmt->close();
    } else {
        // If no specific storeID is provided, fetch and display all stores
        $sql = "SELECT * FROM `store`";
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            $stores = array();
            while ($row = $result->fetch_assoc()) {
                $stores[] = $row;
            }
            echo json_encode($stores);
        } else {
            echo json_encode(["error" => "No stores found"]);
        }
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}

?>
