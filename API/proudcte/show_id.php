<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $productId = $_GET['id'];
    $query = "SELECT product.*, store.StoreName, store.StoreImage,store.StoreID 
    FROM product
    JOIN store ON product.StoreID = store.StoreID
    WHERE product.ProductID = $productId;
    ";


    $result = $conn->query( $query);

    if ($result && $result->num_rows > 0) {
        $data = $result->fetch_assoc(); 
        echo json_encode($data);
    } else {
        echo "no data available";
    }

} else {
    echo "the request method is wrong";
}
?>
