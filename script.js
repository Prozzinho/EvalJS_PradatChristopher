const usersHuman = [{
        type: "humain",
        name: "John Doe",
        email: "j.smith@gmail.com",
        age: 25,
        avatar : './img/john.png',
        icon : './img/john_icon.png',
        latitude : 43.604429,
        longitude : 1.443812
    },
    {
        type: "humain",
        name: "Jane Smith",
        email: "ja.doe@sfr.fr",
        age: 5,
        avatar : './img/jane.png',
        icon : './img/jane_icon.png',
        latitude : 43.60792, 
        longitude : 1.44133
    },
    {
        type: "humain",
        name: "Le Vénérable",
        email: "levy@gmail.com",
        age: 500,
        avatar : './img/venerable.png',
        icon : './img/venerable_icon.png',
        latitude : 43.60053,
        longitude : 1.44590
    }
];

const usersPet = [{
        type: "animal de compagnie",
        espece: "chien",
        name: "Rox",
        age: 7,
        propriétaire: "John Doe",
        avatar : './img/chien.png',
        icon : './img/chien_icon.png',
        latitude : 43.60377,
        longitude : 1.43583
    },
    {
        type: "animal de compagnie",
        espece: "renard",
        name: "Roukie",
        age: 300,
        propriétaire: "Le Vénérable",
        avatar : './img/renard.jpg',
        icon : './img/renard_icon.png',
        latitude : 43.59602,
        longitude : 1.43692
    }
];

const usersXeno = [{
        type: "Xeno",
        espece: "Krogan",
        name: "Wrex",
        menace: "Rouge",
        age: 45,
        avatar : './img/wrex.png',
        icon : './img/wrex_icon.png',
        latitude : 43.59555,
        longitude : 1.45257
    },
    {
        type: "Xeno",
        espece: "Turien",
        name: "Garrus",
        menace: "Vert",
        age: 35,
        avatar : './img/garrus.png',
        icon : './img/garrus_icon.png',
        latitude : 43.61108,
        longitude : 1.45539
    },
    {
        type: "Xeno",
        espece: "Asari",
        name: "Liara",
        menace: "ULTRA Rouge",
        age: 25,
        avatar : './img/liara.png',
        icon : './img/liara_icon.png',
        latitude : 43.61183,
        longitude :  1.43222
    }
];

const tabData = [];
const tableauCopier = [usersHuman, usersPet, usersXeno];
let sectionProfil = document.querySelector(".profils");

for (let i = 0; i < tableauCopier.length; i++){
    tabData.push(tableauCopier[i]);
}

function cardHumain(objet){
    let articleEl = document.createElement("article");
    let titreH2el = document.createElement("h2");
    titreH2el.textContent = objet.name;
    let imageEl = document.createElement("img");
    imageEl.src = objet.avatar;
    imageEl.alt = `Portrait de : ${objet.name}`;
    let paragrapheEl = document.createElement("p");
    paragrapheEl.textContent = `${objet.age} ans - ${objet.email}`;

    sectionProfil.append(articleEl);
    articleEl.append(titreH2el);
    articleEl.append(imageEl);
    articleEl.append(paragrapheEl);
    articleEl.classList.add("card");

    return articleEl;
}


function cardPet(objet){
    let articleEl = document.createElement("article");
    let titreH2el = document.createElement("h2");
    titreH2el.textContent = objet.name;
    let imageEl = document.createElement("img");
    imageEl.src = objet.avatar;
    imageEl.alt = `Portrait de : ${objet.name}`;
    let paragrapheEl = document.createElement("p");
    paragrapheEl.textContent = `${objet.age} ans - ${objet.espece} - Propriétaire : ${objet.propriétaire}`;

    sectionProfil.append(articleEl);
    articleEl.append(titreH2el);
    articleEl.append(imageEl);
    articleEl.append(paragrapheEl);
    articleEl.classList.add("card");
    return articleEl;
}

function cardXeno(objet) {
    let articleEl = document.createElement("article");
    let titreH2el = document.createElement("h2");
    titreH2el.textContent = objet.name;
    let imageEl = document.createElement("img");
    imageEl.src = objet.avatar;
    imageEl.alt = `Portrait de : ${objet.name}`;
    let paragrapheEl = document.createElement("p");
    paragrapheEl.textContent = `${objet.age} ans - ${objet.espece} - Menace : ${objet.menace}`;

    sectionProfil.append(articleEl);
    articleEl.append(titreH2el);
    articleEl.append(imageEl);
    articleEl.append(paragrapheEl);
    articleEl.classList.add("card");
    return articleEl;
}

function profil(tableau) {
    let cardList = [];
    for(let i = 0; i < tableau.length; i++){
        if(tableau[i].type === "humain"){
            cardList.push(cardHumain(tableau[i]));
        }
        else if(tableau[i].type === "animal de compagnie"){
            cardList.push(cardPet(tableau[i]));
        }
        else if(tableau[i].type === "Xeno"){
            cardList.push(cardXeno(tableau[i]));
        }
    }
    return cardList;
}

function profilAll(tableau) {
    for (let i = 0; i < tableau.length; i++) {
        profil(tableau[i]);
    }
}

profilAll(tabData);

var map = L.map('map').setView([ 43.604429, 1.443812], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  function markerProfil(profil){
    const icon = L.icon({
        iconUrl: profil.icon,
        iconSize: [50,83],
        iconAnchor: [25,83]
    });
    L.marker([profil.latitude, profil.longitude], { icon: icon }).addTo(map);
  }

  // Pour chaque groupe (humains, pets, xenos), ajouter un marker par profil
  tabData.forEach((users) => {
    users.forEach((user) => {
      markerProfil(user);
    });
  });