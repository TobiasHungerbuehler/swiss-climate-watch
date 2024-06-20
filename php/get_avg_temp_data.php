<?php
header('Content-Type: application/json');

// Datenbankverbindung herstellen
$servername = "localhost:3306"; // meistens localhost
$username = "thungerbuehler";
$password = "JnhgVuH5!";
$dbname = "thungerbuehler_";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die(json_encode(["error" => "Connection failed: " . $conn->connect_error]));
}

// Berechne den Zeitstempel für vor 24 Stunden
$time_24_hours_ago = date("Y-m-d H:i:s", strtotime('-24 hours'));

// SQL-Abfrage zur Berechnung der Durchschnittstemperaturen der letzten 24 Stunden
$sql = "SELECT city, AVG(temperature) as avg_temp 
        FROM temperature_data 
        WHERE recorded_at >= '$time_24_hours_ago' 
        GROUP BY city";

$result = $conn->query($sql);

if (!$result) {
    die(json_encode(["error" => "Query failed: " . $conn->error]));
}

$data = [];
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $data[] = $row;
    }
} else {
    $data = ["message" => "No data found"];
}

echo json_encode($data);

$conn->close();
?>
