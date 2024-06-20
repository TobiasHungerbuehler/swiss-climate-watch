<?php
// Datenbankverbindung herstellen
$servername = "localhost:3306"; // meistens localhost
$username = "thungerbuehler";
$password = "JnhgVuH5!";
$dbname = "thungerbuehler_";

// Verbindung zur Datenbank herstellen
$conn = new mysqli($servername, $username, $password, $dbname);

// Verbindung prüfen
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// CSV-Datei herunterladen und lesen
$csvUrl = 'https://data.geo.admin.ch/ch.meteoschweiz.messwerte-lufttemperatur-10min/ch.meteoschweiz.messwerte-lufttemperatur-10min_de.csv';
$csvData = file_get_contents($csvUrl);

if ($csvData === false) {
    die("Fehler beim Herunterladen der CSV-Datei");
}

$rows = explode("\n", $csvData);
$header = str_getcsv(array_shift($rows), ';');

// CSV-Daten parsen und in die Datenbank einfügen
foreach ($rows as $row) {
    if (trim($row) == '') {
        continue; // Leere Zeilen überspringen
    }
    $columns = str_getcsv($row, ';');
    $data = array_combine($header, $columns);
    
    // Validierung der Temperaturwerte
    $city = $conn->real_escape_string($data['Stadt']);
    $temperature = $data['Temperatur'];
    
    if (is_numeric($temperature)) {
        $sql = "INSERT INTO temperature_data (city, temperature) VALUES ('$city', '$temperature')";
        if ($conn->query($sql) !== TRUE) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }
}

$conn->close();
?>
