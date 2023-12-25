<?php
// Including database connection file
include '../conction.php';
// Setting the header to return JSON content
header('Content-Type: application/json');

// Getting the product name from the request
$productName = isset($_GET['name']) ? $_GET['name'] : '';

// Preparing SQL Query
$sql = "SELECT * FROM product WHERE ProductName LIKE ?";
$stmt = $conn->prepare($sql);
$searchTerm = "%" . $productName . "%";
$stmt->bind_param("s", $searchTerm);

// Executing the query
$stmt->execute();
$result = $stmt->get_result();

// Fetching the results
$products = [];
while ($row = $result->fetch_assoc()) {
    $products[] = $row;
}

// Closing the statement
$stmt->close();

// Returning the result
echo json_encode($products);
?>
