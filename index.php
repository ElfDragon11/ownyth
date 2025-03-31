<?php
// Serve API requests separately
if (strpos($_SERVER['REQUEST_URI'], '/server/') === 0) {
    return false; // Let Apache/Nginx handle PHP files in /server/
}
// Serve the React app (index.html in /dist/)
$indexFile = __DIR__ . '/waitlist/index.html';

if (file_exists($indexFile)) {
    readfile($indexFile);
} else {
    http_response_code(404);
    echo "404 Not Found - React App Missing";
}
?>