function inscription() {

    
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let tel = document.getElementById("tel").value;
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;
    let mdpConf =document.getElementById("mdp-conf").value;


    if (!nom || !prenom || !email || !utilisateur || !mdp || !mdpConf) {
        alert("Veuillez remplir tous les champs.");
        return;
    }


    if (mdp !== mdpConf) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    } 


    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    let existe = utilisateur.some(u => u.utilisateur === utilisateur);
    if (existe) {
        alert("Ce nom dutilisateur est deja pris.")
        return;
    }

    let nouvelUtilisateur = {
        nom: nom,
        prenom: prenom,
        email: email,
        tel: tel,
        utilisateur: utilisateur,
        mdp: mdp,
        points: 0
    };

    utilisateurs.push(nouvelUtilisateur);
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    alert ("Compte créé avec succes !Bienvenue" + nom +"☺️");

}