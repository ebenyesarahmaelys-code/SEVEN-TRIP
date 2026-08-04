<?php 
include 'config.php'
// connexion 
function connecter($utilisateur, $mdp) {
    global $conn;

    //chercher lutilisateur dans la base de donees

    $sql ="SELECT * FROM utilisateurs WHERE utilisateur = '$utilisateur'";
    $result = $conn->query($sql);

    // ce quon fait si il existe 
    if($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        //si il existe on verifie le mot de passe 
        if(password_verify($mdp, $user['mdp'])) {
            return["sucess"=> true, "user" => $user];
        }
    }

    return ["success" => false, "message" => "Identifiants incorrects."];

}