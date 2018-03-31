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