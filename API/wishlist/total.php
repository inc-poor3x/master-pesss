<?php

include '../conction.php'; // Assuming this file contains the database connection
include "Wishlist.php";

// CORS headers
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] !== 'GET') {
    echo json_encode(["success" => false, "message" => $_SERVER['REQUEST_METHOD'] ." is an invalid request method."]);
    exit;
}

// Assuming you have the following data from the API request
$userID = $_GET['UserID'] ?? null;

// Create an instance of the Wishlist class
$wishlist = new Wishlist();

// Check for missing or invalid data
if ($userID === null || !is_numeric($userID)) {
    echo json_encode(["success" => false, "message" => "Invalid or missing user ID."]);
    exit;
}

// Get the total number of items in the wishlist
$result = $wishlist->getTotalItemsInWishlist($conn, (int)$userID);

// Echo the result in JSON format
echo json_encode($result);

?>
