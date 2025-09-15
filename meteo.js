//Le fichier JS pour la partie Météo

AOS.init({
    duration: 1200,
  })


let info = document.createElement("div")
const buttonMeteo = document.querySelector("aside .cardMeteo button");

info.style.height = "300px";
info.style.width = "200px";
info.style.marginTop = "16px";
info.style.marginBottom = "16px";
info.style.border = "3px solid grey";
info.style.padding = "16px 12px 24px 12px";

buttonMeteo.parentNode.insertBefore(info, buttonMeteo);

function addInfo(conditionActuelle, tempActuelle, tempMax, tempMin) {
    const conditionEl = document.createElement("p");
    conditionEl.textContent = `Condition: ${conditionActuelle}`;
    conditionEl.style.marginBottom = "10px";

    const tempActuelleEl = document.createElement("p");
    tempActuelleEl.textContent = `La Température actuelle: ${tempActuelle}°C`;
    tempActuelleEl.style.marginBottom = "10px";

    const tempMaxEl = document.createElement("p");
    tempMaxEl.textContent = `Max: ${tempMax}°C`;
    tempMaxEl.style.marginBottom = "10px";

    const tempMinEl = document.createElement("p");
    tempMinEl.textContent = `Min: ${tempMin}°C`;

    info.appendChild(conditionEl);
    info.appendChild(tempActuelleEl);
    info.appendChild(tempMaxEl);
    info.appendChild(tempMinEl);
}

function bouton() {
    buttonMeteo.classList.add("button__cardMeteo");
}

buttonMeteo.addEventListener("mousedown", function(){
        buttonMeteo.style.backgroundColor = "orange";
})

buttonMeteo.addEventListener("mouseup", function(){
    buttonMeteo.style.backgroundColor = "";
})
buttonMeteo.addEventListener("mouseleave", function(){
    buttonMeteo.style.backgroundColor = "";
})

buttonMeteo.addEventListener("click", function(){
    fetch("https://prevision-meteo.ch/services/json/toulouse")
    .then(response => {
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return response.json();
    })
    .then(json => {
      let conditionActuelle = json.fcst_day_0.condition;
      let tempActuelle = json.current_condition.tmp;
      let tempMaxJour0 = json.fcst_day_0.tmax;
      let tempMinJour0 = json.fcst_day_0.tmin;

      addInfo(conditionActuelle, tempActuelle, tempMaxJour0, tempMinJour0);
    })
    .catch(err => console.error('Fetch error:', err));
  })
