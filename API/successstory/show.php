<?php

include '../conction.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {

    if (isset($_GET['StoryID'])) {
        // If StoryID is provided in the request, fetch the specific success story
        $storyID = $_GET['StoryID'];
        $sql = "SELECT * FROM successstory WHERE StoryID = $storyID";
    } else {
        // If StoryID is not provided, fetch all success stories
        $sql = "SELECT * FROM successstory";
    }

    $result = $conn->query($sql);

    if ($result && $result->num_rows > 0) {
        $data = array();

        while ($row = $result->fetch_assoc()) {
            $data[] = $row;
        }

        echo json_encode($data);
    } else {
        echo "no data available";
    }

} else {
    echo "the request method is wrong";
}
?>
<!-- {
"StoryID":"3"
} -->