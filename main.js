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

const showImage = (e) => {
    const getCard = document.getElementsByClassName("card");
    getCard.innerHTML = `<img src=`

const hoverPlanet = () => {
    const hoverElement = document.getElementsByClassName("card");
    for (i=0; i<hoverElement.length; i++){
        hoverElement[i].addEventListener('mouseover', showImage);
    }
};

const clickPlanet = () => {
    const clickElement = document.getElementsByClassName("card");
    for (i=0; i<clickElement.length; i++){
        clickElement[i].addEventListener('click', buildPlanet);
    }
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