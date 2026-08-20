// ========================================
//  INSCRIPTION (avec PHP)
// ========================================
function inscription() {
    let nom = document.getElementById("nom").value;
    let prenom = document.getElementById("prenom").value;
    let email = document.getElementById("email").value;
    let telephone = document.getElementById("telephone").value;
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

    let formData = new FormData();
    formData.append("nom", nom);
    formData.append("prenom", prenom);
    formData.append("email", email);
    formData.append("telephone", telephone);
    formData.append("utilisateur", utilisateur);
    formData.append("mdp", mdp);

    fetch("../backend/inscription.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            window.location.href = "Accueil.html";
        }
    })
    .catch(error => console.error("Erreur inscription :", error));
}

// ========================================
//  CONNEXION (avec PHP)
// ========================================
function connexion() {
    let utilisateur = document.getElementById("utilisateur").value;
    let mdp = document.getElementById("mdp").value;

    if (!utilisateur || !mdp) {
        alert("Veuillez remplir tous les champs.");
        return;
    }

    let formData = new FormData();
    formData.append("utilisateur", utilisateur);
    formData.append("mdp", mdp);

    fetch("../backend/connexion.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Connexion réussie ! Bienvenue " + data.user.nom + " ☺️");
            window.location.href = "Accueil.html";
        } else {
            alert(data.message);
        }
    })
    .catch(error => console.error("Erreur connexion :", error));
}

// ========================================
//  RÉSERVATION TAXI (avec PHP)
// ========================================
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

    let distance = Math.floor(Math.random() * 25) + 5;
    let duree = Math.round(distance * 2);
    let prix = distance * 500 + prixVehicule;

    let formData = new FormData();
    formData.append("utilisateur_id", 1);
    formData.append("depart", depart);
    formData.append("destination", destination);
    formData.append("date", date);
    formData.append("heure", heure);
    formData.append("vehicule", vehiculeChoisi);
    formData.append("paiement", paiement.value);
    formData.append("distance", distance);
    formData.append("duree", duree);
    formData.append("prix", prix);

    fetch("../backend/reservation.php", {
        method: "POST",
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (data.success) {
            window.location.href = "Accueil.html";
        }
    })
    .catch(error => console.error("Erreur réservation :", error));
}

// ========================================
//  CHARGER L'HISTORIQUE
// ========================================
function chargerHistorique() {
    fetch("../backend/historique.php?user_id=1")
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("historique-container");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(resa => {
                container.innerHTML += `
                    <div class="history-card">
                        <div class="history-info">
                            <h3>${resa.vehicule}</h3>
                            <p>${resa.depart} → ${resa.destination}</p>
                            <small>${resa.date} à ${resa.heure}</small>
                        </div>
                        <div class="history-price">${resa.prix} FCFA</div>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Erreur historique :", err));
}

// ========================================
//  CHARGER LES MESSAGES
// ========================================
function chargerMessages() {
    fetch("../backend/boite_lettres.php?user_id=1")
        .then(response => response.json())
        .then(data => {
            let container = document.getElementById("messages-container");
            if (!container) return;
            container.innerHTML = "";
            data.forEach(msg => {
                container.innerHTML += `
                    <div class="message">
                        <div class="message-icon">📩</div>
                        <div>
                            <h3>${msg.titre}</h3>
                            <p>${msg.message}</p>
                        </div>
                        <span>${msg.date_envoi}</span>
                    </div>
                `;
            });
        })
        .catch(err => console.error("Erreur messages :", err));
}

// ========================================
//  CHARGER LES POINTS
// ========================================
function chargerPoints() {
    fetch("../backend/points.php?user_id=1")
        .then(response => response.json())
        .then(data => {
            let el = document.getElementById("points-affichage");
            if (el) el.textContent = data.points + " pts";
        })
        .catch(err => console.error("Erreur points :", err));
}

// ========================================
//  CHARGER LES STATISTIQUES ADMIN
// ========================================
function chargerStats() {
    let container = document.getElementById("stats-container");
    if (!container) return;

    // Exemple de données (à remplacer par de vraies données PHP plus tard)
    let stats = [
        { label: "Total Utilisateurs", value: "1 248", icon: "👥", color: "purple" },
        { label: "Courses aujourd'hui", value: "46", icon: "🚕", color: "orange" },
        { label: "Locations aujourd'hui", value: "23", icon: "🚗", color: "blue" },
        { label: "Revenus aujourd'hui", value: "215 000 FCFA", icon: "↗", color: "green" }
    ];

    container.innerHTML = "";
    stats.forEach(stat => {
        container.innerHTML += `
            <div class="stat-card">
                <div>
                    <small>${stat.label}</small>
                    <strong>${stat.value}</strong>
                </div>
                <div class="stat-icon ${stat.color}">${stat.icon}</div>
            </div>
        `;
    });
}

// ========================================
//  REDIRECTIONS
// ========================================
function goTaxi() {
    window.location.href = "taxi_course.html";
}

function goLoca() {
    window.location.href = "location.html";
}

// ========================================
//  VARIABLES GLOBALES
// ========================================
let vehiculeChoisi = "";
let prixVehicule = 0;

// ========================================
//  CHOISIR UN VÉHICULE
// ========================================
function choisirVehicule(nom, prix) {
    vehiculeChoisi = nom;
    prixVehicule = prix;
    document.getElementById("recap-vehicule").innerText = nom + " (" + prix + " FCFA)";
    majRecap();
}

// ========================================
//  METTRE À JOUR LE RÉCAPITULATIF
// ========================================
function majRecap() {
    let depart = document.getElementById("depart").value;
    let destination = document.getElementById("destination").value;
    let date = document.getElementById("date").value;
    let heure = document.getElementById("heure").value;

    document.getElementById("recap-depart").innerText = depart || "Non renseigné";
    document.getElementById("recap-destination").innerText = destination || "Non renseigné";
    document.getElementById("recap-date").innerText = date || "Non renseigné";
    document.getElementById("recap-heure").innerText = heure || "Non renseigné";

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