<?php
include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'GET') {
    // Use prepared statement to prevent SQL injection

    $stmt = $conn->prepare("
    SELECT r.RatingID, r.RatingValue,r.Comment,r.DateRated,p.ProductName, u.UserName
    FROM rating r
    JOIN product p ON r.ProductID = p.ProductID
    JOIN user u ON r.UserID = u.UserID;
    
    

    
    
    ");
    
    if ($stmt->execute()) {
        // Get result set
        $result = $stmt->get_result();
        
        // Fetch data and encode as JSON
        $ratings = [];
        while ($row = $result->fetch_assoc()) {
            $ratings[] = $row;
        }
        
        echo json_encode($ratings);
    } else {
        echo "Error retrieving ratings: " . $stmt->error;
    }

    // Close the statement
    $stmt->close();
} else {
    echo "Invalid request method";
}
?>
