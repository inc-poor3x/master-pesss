<?php
// Include the database connection file
include '../conction.php';


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Content-Type: application/json'); // Set Content-Type to application/json

// Extract OrderID from the request
$orderID = isset($_GET['orderID']) ? $_GET['orderID'] : '';

// Validate OrderID
if (empty($orderID) || !is_numeric($orderID)) {
    echo json_encode(['error' => 'Invalid OrderID', 'message' => 'OrderID is invalid or not provided.']);
    exit;
}

// SQL query
$sql = "SELECT product.description, product.productName, product.price, orderitem.quantity 
FROM orderitem 
JOIN product ON product.ProductID = orderitem.product 
WHERE orderitem.OrderID=?";

// Prepare and bind
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $orderID);

// Execute query
$stmt->execute();
$result = $stmt->get_result();

// Check if we have results
if ($result->num_rows > 0) {
    // Fetch results
    $data = $result->fetch_all(MYSQLI_ASSOC);
    echo json_encode(['success' => true, 'data' => $data]);
} else {
    // No data found
    echo json_encode(['success' => false, 'message' => 'No data found for the given OrderID.']);
}

// Close connections
$stmt->close();
$conn->close();
?>
