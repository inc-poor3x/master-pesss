<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

class ProductHandler
{
    private $conn;

    public function __construct($conn)
    {
        $this->conn = $conn;
    }

    public function getTotalProducts()
    {
        $sql = "SELECT COUNT(*) as totalProducts FROM `product`";
        $result = $this->conn->query($sql);

        if ($result !== false && $result->num_rows > 0) {
            $row = $result->fetch_assoc();
            return $row['totalProducts'];
        } else {
            return false;
        }
    }
}

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    // Create an instance of the ProductHandler class
    $productHandler = new ProductHandler($conn);

    // Get the total number of products
    $totalProducts = $productHandler->getTotalProducts();

    if ($totalProducts !== false) {
        echo json_encode(["totalProducts" => $totalProducts]);
    } else {
        echo json_encode(["error" => "Error retrieving total products"]);
    }
} else {
    echo json_encode(["error" => "Invalid request method"]);
}
?>
