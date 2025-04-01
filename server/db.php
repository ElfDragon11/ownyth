<?php
$host = "localhost";
$dbname = "calvevav_ownyth_waitlist";
$username = "calvevav_admin";
$password = "Booksoverair!";
/*/
$host = "localhost";
$username = "root"; // Default for MAMP
$password = "root"; // Default for MAMP
$dbname = "development"; // Change this to your database name
/*/
$conn = new mysqli($host, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}
//echo "Connected successfully";
?>
