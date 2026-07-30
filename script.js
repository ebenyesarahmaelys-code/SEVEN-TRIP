function inscription() {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;
    let mdpConf = document.getElementById("mdp-conf").value;

    if (!nom || !prenom || !email || !utilisateur || !mdp || !mdpConf) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    if (mdp !== mdpConf) {
        alert("Les mots de passe ne correspondent pas.");
        return;
    }

    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];
    let existe = utilisateurs.some(u => u.utilisateur === utilisateur);

    if (existe) {
        alert("Ce nom d'utilisateur est déjà pris.");
        return;
    }

    let nouvelUtilisateur = {
        nom: nom,
        prenom: prenom,
        email: email,
        utilisateur: utilisateur,
        mdp: mdp,
        points: 0
    };

    utilisateurs.push(nouvelUtilisateur);
    localStorage.setItem("utilisateurs", JSON.stringify(utilisateurs));

    alert("Compte créé avec succès ! Bienvenue " + nom + " ☺️");

    // Rediriger vers la page d'accueil
    window.location.href = "Accueil.html";

    document.getElementById("nom").value = "";
document.getElementById("prenom").value = "";
document.getElementById("email").value = "";
document.getElementById("utilisateur").value = "";
document.getElementById("mdp").value = "";
document.getElementById("mdp-conf").value = "";
}


function connexion() {
    
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;

    if (!utilisateur || !mdp) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    let utilisateurs = JSON.parse(localStorage.getItem("utilisateurs")) || [];

    let compteValide = utilisateurs.some(u => u.utilisateur === utilisateur && u.mdp === mdp);

    if(compteValide) {
        alert("Connexion reussie ! Bienvenue " + utilisateur +"☺️");
        window.location.href ="Accueil.html";

    } else {
        alert("Nom d'utilisateur ou mot de passe incorrect.");
    }

    document.getElementById("nom").value = "";
document.getElementById("prenom").value = "";
document.getElementById("email").value = "";
document.getElementById("utilisateur").value = "";
document.getElementById("mdp").value = "";
document.getElementById("mdp-conf").value = "";
}

function goTaxi() {
    window.location.href ="taxi_course.html"
}

function goLoca() {
    window.location.href ="Location.html"
}
// === VARIABLES GLOBALES ===
let vehiculeChoisi = "";
let prixVehicule = 0;

// === CHOISIR UN VÉHICULE ===
function choisirVehicule(nom, prix) {
    vehiculeChoisi = nom;
    prixVehicule = prix;
    document.getElementById("recap-vehicule").innerText = nom + " (" + prix + " FCFA)";
    majRecap(); // ← pour mettre à jour le prix immédiatement
}

// === METTRE À JOUR LE RÉCAPITULATIF ===
function majRecap() {
    let depart = document.getElementById("depart").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;

    document.getElementById("recap-depart").innerText = depart || "Non renseigné";
    document.getElementById("recap-destination").innerText = destination || "Non renseigné";
    document.getElementById("recap-date").innerText = date || "Non renseigné";
    document.getElementById("recap-heure").innerText = heure || "Non renseigné";

    // Calcul de la distance et du prix
    if (depart && destination && depart.toLowerCase() !== destination.toLowerCase()) {
        let distance = Math.floor(Math.random() * 25) + 5;
        let duree = Math.round(distance * 2);
        let prix = distance * 500 + prixVehicule;

        document.getElementById("recap-distance").innerText = distance + " km";
        document.getElementById("recap-temps").innerText = duree + " min";
        document.getElementById("recap-prix").innerText = prix + " FCFA";
    } else {
        document.getElementById("recap-distance").innerText = "0 km";
        document.getElementById("recap-temps").innerText = "0 min";
        document.getElementById("recap-prix").innerText = "0 FCFA";
    }
}
function reserverTaxi() {
    let depart = document.getElementById("depart").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;
    let paiement = document.querySelector('input[name="paiement"]:checked');

    if (!depart || !destination || !date || !heure || !vehiculeChoisi || !paiement) {
        alert("⚠️ Veuillez remplir tous les champs.");
        return;
    }

    // Calcul
    let distance = Math.floor(Math.random() * 25) + 5;
    let duree = Math.round(distance * 2);
    let prix = distance * 500 + prixVehicule;

    // Afficher le récapitulatif
    document.getElementById("recap-depart").innerText = depart;
    document.getElementById("recap-destination").innerText = destination;
    document.getElementById("recap-date").innerText = date;
    document.getElementById("recap-heure").innerText = heure;
    document.getElementById("recap-vehicule").innerText = vehiculeChoisi;
    document.getElementById("recap-distance").innerText = distance + " km";
    document.getElementById("recap-temps").innerText = duree + " min";
    document.getElementById("recap-prix").innerText = prix + " FCFA";

    // 1ère confirmation
    let confirm1 = confirm("✅ Vérifiez vos informations :\n\n" +
        "Départ : " + depart + "\n" +
        "Destination : " + destination + "\n" +
        "Date : " + date + "\n" +
        "Heure : " + heure + "\n" +
        "Véhicule : " + vehiculeChoisi + "\n" +
        "Paiement : " + paiement.value + "\n\n" +
        "📌 Cliquez sur OK pour voir le récapitulatif complet.");

    if (!confirm1) return;

    // 2ème confirmation
    let confirm2 = confirm("📋 Récapitulatif final :\n\n" +
        "Distance : " + distance + " km\n" +
        "Durée estimée : " + duree + " min\n" +
        "Prix estimé : " + prix + " FCFA\n\n" +
        "✅ Confirmez-vous cette réservation ?");

    if (!confirm2) {
        alert("❌ Réservation annulée.");
        return;
    }

    // Sauvegarde
    let reservation = {
        depart,
        destination,
        date,
        heure,
        vehicule: vehiculeChoisi,
        paiement: paiement.value,
        distance,
        duree,
        prix
    };

    let reservations = JSON.parse(localStorage.getItem("reservations")) || [];
    reservations.push(reservation);
    localStorage.setItem("reservations", JSON.stringify(reservations));

    alert("✅ Réservation confirmée !");

    // Rediriger vers l'accueil
    window.location.href = "Accueil.html";
}