<?php
include 'config.php';

function getChauffeurs() {
    global $conn;

    $sql = "SELECT * FROM chauffeurs";
    $result = $conn->query($sql);

    $chauffeurs = [];
    while ($row = $result->fetch_assoc()) {
        $chauffeurs[] = $row;
    }

    return $chauffeurs;
}

function ajouterChauffeur($nom, $telephone, $vehicule_id) {
    global $conn;

    $sql = "INSERT INTO chauffeurs (nom, telephone, vehicule_id)
            VALUES ('$nom', '$telephone', '$vehicule_id')";

    return $conn->query($sql);
}
header('Content-Type: application/json');

$chauffeurs = getChauffeurs();
echo json_encode($chauffeurs);
?>