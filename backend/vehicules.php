<?php
include 'config.php';

function getVehicules() {
    global $conn;

    $sql = "SELECT * FROM vehicules";
    $result = $conn->query($sql);

    $vehicules = [];
    while ($row = $result->fetch_assoc()) {
        $vehicules[] = $row;
    }

    return $vehicules;
}

function ajouterVehicule($nom, $prix, $image, $type, $places, $transmission, $carburant, $clim) {
    global $conn;

    $sql = "INSERT INTO vehicules (nom, prix, image, type, places, transmission, carburant, clim)
            VALUES ('$nom', '$prix', '$image', '$type', '$places', '$transmission', '$carburant', '$clim')";

    return $conn->query($sql);
}

header('Content-Type: application/json');

$vehicules = getVehicules();
echo json_encode($vehicules);
?>