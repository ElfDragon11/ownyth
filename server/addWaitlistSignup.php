<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

include 'db.php';
// Check connection
if ($conn->connect_error) {
    die(json_encode(["success" => false, "message" => "Connection failed: " . $conn->connect_error]));
}

// Get data from request
$data = json_decode(file_get_contents("php://input"), true);

if (isset($data['fullName'], $data['email'], $data['source'])) {
    $full_name         = $conn->real_escape_string($data['fullName']);
    $email             = $conn->real_escape_string($data['email']);
    $source            = $conn->real_escape_string($data['source']);
    $preferredContent  = $conn->real_escape_string($data['mediaPreference']);
    $role              = $conn->real_escape_string($data['userType']);

    // Prevent duplicate emails
    $checkEmail = "SELECT * FROM signups WHERE email = '$email'";
    $result = $conn->query($checkEmail);

    $sqlA = "INSERT INTO signups (full_name, email, date_added, source, preferred_content, role) 
                VALUES ('$full_name', '$email', NOW(), '$source', '$preferredContent', '$role')";
    if ($result->num_rows > 0) {
        echo json_encode(["success" => false, "message" => "Email already exists","sql"=>$sqlA]);
    } else {
        $sql = "INSERT INTO signups (full_name, email, date_added, source, preferred_content, role) 
                VALUES ('$full_name', '$email', NOW(), '$source', '$preferredContent', '$role')";
        if ($conn->query($sql) === TRUE) {
            echo json_encode(["success" => true, "message" => "User added successfully","sql"=>$sql]);
        } else {
            echo json_encode(["success" => false, "message" => "Error: " . $conn->error,"sql"=>$sql]);
        }
    }
} else {
    echo json_encode(["success" => false, "message" => "Invalid input", "data" => $data]);
}
$conn->close();
?>
