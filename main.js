const printToDom = (divID, string) => {
    document.getElementById(divID).innerHTML = string;
};

const dwarfPlanet = (nameOfPlanet) => {
    domString = `<div class="card">`;
    domString +=    `<h3>${nameOfPlanet}</h3>`;
    domString += `</div>`;
    return domString;
};

const buildSolarSystem = (planetArray) => {
    let solarSystem = '';
    for (i=0; i<planetArray.length; i++){
        let planetData = planetArray[i];
        let planetName = planetData.name;
        solarSystem += dwarfPlanet(planetName);
    }
    printToDom("milky-way", solarSystem);
};

function fileError() {
    console.log("There was an error");
}

function fileLoaded() {
    const data = JSON.parse(this.responseText);
    buildSolarSystem(data.planets);
    // hoverPlanet();
    // clickPlanet();
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", fileLoaded);
    myRequest.addEventListener("error", fileError);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication();