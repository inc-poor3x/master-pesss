<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (isset($_GET['id'])) {
        $productId = $_GET['id'];
        $query = "SELECT product.*, store.StoreName, store.StoreImage, store.StoreID 
        FROM product
        JOIN store ON product.StoreID = store.StoreID
        WHERE product.ProductID = $productId";

        $result = $conn->query($query);

        if ($result && $result->num_rows > 0) {
            $data = $result->fetch_assoc();
            echo json_encode(['success' => true, 'data' => $data]);
        } else {
            http_response_code(404); // Not Found
            echo json_encode(['success' => false, 'message' => "No data available"]);
        }
    } else {
        http_response_code(400); // Bad Request
        echo json_encode(['success' => false, 'message' => "id parameter is required"]);
    }
} else {
    http_response_code(405); // Method Not Allowed
    echo json_encode(['success' => false, 'message' => "The request method is wrong"]);
}
?>
