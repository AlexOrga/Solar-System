const printToDom = (divID, string) => {
    document.getElementById(divID).innerHTML = string;
};

// ***************** Solar System Setup *****************************

const dwarfPlanet = (nameOfPlanet, index) => {
    domString = `<div class="card" id="${index}">`;
    domString +=    `<h3 class="planetName">${nameOfPlanet.name}</h3>`;
    domString +=    `<img class="hidden" src="${nameOfPlanet.imageUrl}">`;
    domString += `</div>`;
    return domString;
};

const buildSolarSystem = (planetArray) => {
    let solarSystem = '';
    for (i=0; i<planetArray.length; i++){
        let planetData = planetArray[i];
        solarSystem += dwarfPlanet(planetData, i);
    }
    printToDom("milky-way", solarSystem);
};

//*************** Single Planet Card ******************************** 

const buildPlanet = (e) => {
    let position = e.target.id;
    // while(e.target.className != "card"){
    //     position = e.target.parentNode.id;
    // }
    console.log("position", position);
};

// ************** Event Listeners On Solar System ********************

const showImage = (e) => {
    let div = e.target;
    while(div.className != "card"){
        div = div.parentNode;
    }
    div.children[0].className = 'hidden';
    div.children[1].className = '';
}

const undoShowImage = (e) => {
    let div = e.target;
    while(div.className != "card"){
        div = div.parentNode;
    }
    div.children[0].className = '';
    div.children[1].className = 'hidden';
}

const hoverPlanet = () => {
    const hoverElement = document.getElementsByClassName("card");
    for (i=0; i<hoverElement.length; i++){
        hoverElement[i].addEventListener('mouseover', showImage);
        hoverElement[i].addEventListener('mouseleave', undoShowImage);
    }
};

const clickPlanet = () => {
    const clickElement = document.getElementsByClassName("card");
    for (i=0; i<clickElement.length; i++){
        clickElement[i].addEventListener('click', (e) => {
            debugger;
            console.log("e", e);
        });
    }
};

// ************************ Second XHR Request *****************

function fileLoaded2 () {
    const data2 = JSON.parse(this.responseText);
    buildPlanet(data2.planets);
    killPlanet();
}

const xhrDos = () => {
    let myRequest2 = new XMLHttpRequest();
    myRequest2.addEventListener("load", fileLoaded2);
    myRequest2.addEventListener("error", fileError);
    myRequest2.open("GET", "planets.json");
    myRequest2.send();
};

//************************* First XHR Request ******************

function fileError() {
    console.log("There was an error");
}

function fileLoaded() {
    const data = JSON.parse(this.responseText);
    buildSolarSystem(data.planets);
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

startApplication();