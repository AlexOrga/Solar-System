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

const buildPlanet = (array, index) => {
    let domString = '';
        domString += `<div>`;
        domString +=    `<img id="red-x" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Antu_task-reject.svg/512px-Antu_task-reject.svg.png">`;
        domString +=    `<h1>${array[index].name}</h1>`;
        domString +=    `<img src="${array[index].imageUrl}">`;
        domString +=    `<p>${array[index].description}</p>`;
        domString +=    `<h5>Number of Moons: ${array[index].numberOfMoons}</h5>`;
        domString +=    `<h5>Name of Largest Moon: `;
        if(array[index].nameOfLargestMoon === ""){
            domString += `This planet has no moons</h5>`;
        } else {
            domString += `${array[index].nameOfLargestMoon}</h5>`
        };
        domString += `</div>`;
    printToDom("milky-way", domString);
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

const clickPlanet = (array) => {
    const clickElement = document.getElementsByClassName("card");
    for (i=0; i<clickElement.length; i++){
        clickElement[i].addEventListener('click', (e) => {
            let eventPosition = e.target;
            while(eventPosition.className != "card"){
                eventPosition = eventPosition.parentNode;
            }
            eventPosition = eventPosition.id * 1;
            buildPlanet(array, eventPosition);
            killPlanet();
        });
    }
};

const killPlanet = () => {
    const getX = document.getElementById("red-x");
    getX.addEventListener('click', startApplication);
};

// ************************ Search Bar ********************

const searchEvent = (array) => {
    let getSearch = document.getElementById("search-bar");
    getSearch.addEventListener('keypress', function (e) {
        var key = e.which || e.keyCode;
        if (key === 13) { 
            getSearch = getSearch.value;
            filterResults(array, getSearch);
        }
    });
};

// const searchBar = (array) => {
//     const dataToCompare = array;
//     let userInput = document.getElementById("search-bar").value;
//     userInput = userInput.split(' ');
//     userInput.forEach((input) => {
//         filterResults(dataToCompare, userInput);
//     });
//     console.log("userInput: ", userInput);
// };

const filterResults = (array, searchKey) => {
    return array.filter((obj) => {
      return Object.keys(obj).some((key) => {
        if (typeof obj[key] === 'string') {
            let returned = obj[key].toLowerCase().includes(searchKey.toLowerCase());
            console.log(returned);
        }
      })
    });
  } 

// ************************ Second XHR Request *****************

function fileLoaded2 () {
    const data2 = JSON.parse(this.responseText);
    clickPlanet(data2.planets);
    searchEvent(data2.planets);
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
    searchEvent(data.planets);
}

const startApplication = () => {
    let myRequest = new XMLHttpRequest();
    myRequest.addEventListener("load", fileLoaded);
    myRequest.addEventListener("error", fileError);
    myRequest.open("GET", "planets.json");
    myRequest.send();
}

startApplication();
xhrDos();
