<?php
// Configuration de la base de donnees

$host = "localhost";
$user = "root";
$pass ="";
$dbname = "seven-trip";

// Connexion a la base de donnees

$conn = new mysqli($host, $user, $pass, $dbname);

//on verifie la connexion

if ($conn->connect_error) {
    die("Echec de connexion a la base de donnees :" . $conn->connect_error);
}

?>