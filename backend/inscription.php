<?php
include 'config.php';

// INSCRIPTION 
function inscrire($nom, $prenom, $email, $telephone, $utilisateur, $mdp) {
    global $conn;

    // Vérifier si l'utilisateur ou l'email existe déjà
    $check = "SELECT * FROM utilisateurs WHERE utilisateur = '$utilisateur' OR email = '$email'";
    $result = $conn->query($check);

    if ($result->num_rows > 0) {
        return ["success" => false, "message" => "Cet utilisateur ou cet email existe déjà."];
    }

    // Hasher le mot de passe
    $mdpHash = password_hash($mdp, PASSWORD_DEFAULT);

    // Insertion de l'utilisateur
    $sql = "INSERT INTO utilisateurs (nom, prenom, email, telephone, utilisateur, mdp)
            VALUES ('$nom', '$prenom', '$email', '$telephone', '$utilisateur', '$mdpHash')";

    if ($conn->query($sql) === TRUE) {
        return ["success" => true, "message" => "Inscription réussie."];
    } else {
        return ["success" => false, "message" => "Erreur : " . $conn->error];
    }
}
?>