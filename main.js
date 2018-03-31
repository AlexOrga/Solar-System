const printToDom = (divID, string) => {
    document.getElementById(divId).innerHTML = string;
}

const dwarfPlanet = (planet) => {
    domString = `<div class="card">`
    domString +=    `<h3>${planet.name}</h3>`;
    domString += `</div>`
}

const buildSolarSystem = (planetArray) => {
    let solarSystem = '';
    for (i=0; i<planetArray.length; i++){
        let planetName = planetArray[i];
        solarSystem += dwarfPlanet(planetArray);
    }
}

function fileError() {
    console.log("There was an error");
}

function fileLoaded() {
    const data = JSON.parse(this.responseText);
    buildSolarSystem(planets.json);
    hoverPlanet();
    clickPlanet();
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", fileLoaded);
    myRequest.addEventListener("error", fileError);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}