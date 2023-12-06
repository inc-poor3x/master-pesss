<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class StoreHandler
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getTotalStores()
    {
        $sql = "SELECT COUNT(*) as totalStores FROM `store`";
        $result = $this->conn->query($sql);

        if ($result !== false && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['totalStores'];
        } else {
            return false;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Create an instance of the StoreHandler class
    $storeHandler = new StoreHandler($conn);

    // Get the total number of stores
    $totalStores = $storeHandler->getTotalStores();

    if ($totalStores !== false) {
        echo json_encode(["totalStores" => $totalStores]);
    } else {
        echo json_encode(["error" => "Error retrieving total stores"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
