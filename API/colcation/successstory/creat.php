<?php

include '../conction.php';
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Check if required fields are set
    if (
        isset($data['UserID']) &&   // Assuming UserID is the parameter for the user
        isset($data['StoryText'])   // Assuming StoryText is the text of the story
    ) {
        // Use prepared statement to prevent SQL injection
        $stmt = $conn->prepare("INSERT INTO successstory (UserID, StoryText, DatePublished) VALUES (?, ?, NOW())");
        $stmt->bind_param("is", $data['UserID'], $data['StoryText']);

        if ($stmt->execute()) {
            echo "Story inserted successfully";

            // You should probably return the inserted data as JSON, so encode and echo it
            echo json_encode($data);
        } else {
            echo "Story not inserted: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    } else {
        echo "Required fields not set";
    }
} else {
    echo "Request method false";
}
?>
<!-- {
  "UserID": 5,   from  frontend
  "StoryText": "This is a test story. It can be a longer piece of text describing the success story."
} -->