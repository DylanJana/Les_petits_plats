import { addLineInDropDown } from "../../pages/app.js";
import { firstDropDown, dropDownList } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown } from "../dropdowns/dropdown-devices.js";
import { thirdDropDown } from "../dropdowns/dropdown-instruments.js";
import{ itemListDisabledOnClick } from "../tags/tags.js";

let dropDownListDevices = document.querySelector('.dropdown--quarts ul');
let dropDownListInstruments = document.querySelector('.dropdown--fifth ul');
let ingredientsArray = [];
export let ingredientsAvailablesArray = [];

export const itemsInDropDown = () => {
    let availablesRecipes = document.querySelectorAll('.avaible__recipe');
    ingredientsCurrentRecipe(availablesRecipes);
    devicesCurrentRecipe(availablesRecipes);
    instrumentsCurrentRecipe(availablesRecipes);
    itemListDisabledOnClick();
}



const ingredientsCurrentRecipe = (availablesRecipes) => {
    let availablesIngredients = [];
    for(let i = 0; i < availablesRecipes.length; i++) {
        let currentRecipeIngredients = availablesRecipes[i].querySelectorAll('.recipe__list li span');
        for(let j = 0; j < currentRecipeIngredients.length; j++ ) {
            let currentIngredient = currentRecipeIngredients[j].textContent;
            availablesIngredients.push(currentIngredient);
        }
    }
    createCurrentIngredients(availablesIngredients);
}

const createCurrentIngredients = (availablesIngredients) => {
    dropDownList.innerHTML = '';
    for(let i = 0 ; i < availablesIngredients.length; i++) {
        for(let j = 0; j < firstDropDown.length; j++) {
            if(availablesIngredients[i].toLowerCase().trim() === firstDropDown[j].toLowerCase()) {
                if(ingredientsArray.indexOf(firstDropDown[j]) < 0) {
                    ingredientsArray.push(firstDropDown[j])
                }
            }
        }
    }

    for(let i = 0; i < ingredientsArray.length; i++) {
        addLineInDropDown(dropDownList, ingredientsArray[i]);
    }
}


const devicesCurrentRecipe = (availablesRecipes) => {
    let avaiblesDevices = [];
    for(let i = 0; i < availablesRecipes.length; i++) {
        let currentRecipeDevices = availablesRecipes[i].querySelectorAll('.recipe__desc');
        for(let j = 0; j < currentRecipeDevices.length; j++ ) {
            let currentDevices = currentRecipeDevices[j].textContent;
            avaiblesDevices.push(currentDevices);
        }
    }

    createCurrentDevices(avaiblesDevices)
}

const createCurrentDevices = (avaiblesDevices) => {
    dropDownListDevices.innerHTML = '';
    let devicesArray = [];
    for(let i = 0 ; i < avaiblesDevices.length; i++) {
        for(let j = 0; j < secondDropDown.length; j++) {
            if(avaiblesDevices[i].toLowerCase().trim().includes(secondDropDown[j].toLowerCase())) {
                if(devicesArray.indexOf(secondDropDown[j]) < 0) {
                    devicesArray.push(secondDropDown[j]);
                }
            }
        }
    }

    for(let i = 0; i < devicesArray.length; i++) {
        addLineInDropDown(dropDownListDevices, devicesArray[i]);
    }
}

const instrumentsCurrentRecipe = (availablesRecipes) => {
    let avaiblesInstruments = [];
    for(let i = 0; i < availablesRecipes.length; i++) {
        let currentRecipeInstruments = availablesRecipes[i].querySelectorAll('.recipe__desc');
        for(let j = 0; j < currentRecipeInstruments.length; j++ ) {
            let currentInstruments = currentRecipeInstruments[j].textContent;
            avaiblesInstruments.push(currentInstruments);
        }
    }

    createCurrentInstruments(avaiblesInstruments)
}

const createCurrentInstruments = (avaiblesInstruments) => {
    dropDownListInstruments.innerHTML = '';
    let instrumentsArray = [];
    for(let i = 0 ; i < avaiblesInstruments.length; i++) {
        for(let j = 0; j < thirdDropDown.length; j++) {
            if(avaiblesInstruments[i].toLowerCase().trim().includes(thirdDropDown[j].toLowerCase())) {
                if(instrumentsArray.indexOf(thirdDropDown[j]) < 0) {
                    instrumentsArray.push(thirdDropDown[j]);
                }
            }
        }
    }

    for(let i = 0; i < instrumentsArray.length; i++) {
        addLineInDropDown(dropDownListInstruments, instrumentsArray[i]);
    }
}

export const searchByTags = (tagValue) => {
    dropDownList.innerHTML = '';
    dropDownListDevices.innerHTML = '';
    dropDownListInstruments.innerHTML = '';
    let allRecipes = document.querySelectorAll('.avaible__recipe');
    let avaiblesRecipes = [];
    let containerBoxes = document.querySelector('.box__tag__container');

    displayRecipes(allRecipes, avaiblesRecipes, tagValue);

    for(let i = 0; i < avaiblesRecipes.length; i++) {
        let currentRecipe = avaiblesRecipes[i];
        currentRecipeIngredients(currentRecipe, containerBoxes);
        currentRecipeDevices(currentRecipe, containerBoxes);
        currentInstrumentsDevices(currentRecipe, containerBoxes);
    }

    refreshIngredientsDropDown(containerBoxes);
    refreshDevicesDropDown(containerBoxes);
    refreshInstrumentsDropDown(containerBoxes);
}

const displayRecipes = (allRecipes, avaiblesRecipes, tagValue) => {
    for(let i = 0; i < allRecipes.length; i++) {
        let avaibleRecipe = allRecipes[i];
        if((!(avaibleRecipe.innerText.toLowerCase().includes(tagValue.toLowerCase() || tagValue)))) {
                avaibleRecipe.style.display = "none";
                avaibleRecipe.classList.remove('avaible__recipe');
        } else {
            avaiblesRecipes.push(avaibleRecipe);
        }
    }
}

const currentRecipeIngredients = (currentRecipe, containerBoxes) => {
    let currentRecipeIngredients = currentRecipe.querySelectorAll('.recipe__list li span');
        for(let j = 0; j < currentRecipeIngredients.length; j++) {
            let currentIngredient = currentRecipeIngredients[j].innerText;
            if((containerBoxes.innerText.search(currentIngredient[0].toUpperCase() + currentIngredient[0].slice(1)))) {
                addLineInDropDown(dropDownList, currentIngredient);
            }
        }
}

const refreshIngredientsDropDown = (containerBoxes) => {
    let liIngredients = document.querySelectorAll('.dropdown--tiers ul li');
    for(let i = 0; i < liIngredients.length; i++) {
        let liIngredient = liIngredients[i];
        if((containerBoxes.innerText.includes(liIngredient.innerText))) {
            liIngredient.style.display = 'none';
        }
    }
}

const currentRecipeDevices = (currentRecipe, containerBoxes) => {
    let currentRecipeDevices = currentRecipe.querySelectorAll('.recipe__desc');
        for(let i = 0; i < currentRecipeDevices.length; i++) {
            let currentDevices = currentRecipeDevices[i].innerText;
            for(let j = 0; j < secondDropDown.length; j++) {
                let currentDevicesInDropDown = secondDropDown[j].toLowerCase()
                if(currentDevices.toLowerCase().trim().includes(currentDevicesInDropDown)) {
                    if((containerBoxes.innerText.search(currentDevicesInDropDown[0].toUpperCase() + currentDevicesInDropDown.slice(1)))) {
                        addLineInDropDown(dropDownListDevices, currentDevicesInDropDown);
                    }
                }
            }
        }
}

const refreshDevicesDropDown = (containerBoxes) => {
    let liDevices = document.querySelectorAll('.dropdown--quarts ul li');
    for(let i = 0; i < liDevices.length; i++) {
        let liDevice = liDevices[i];
        if((containerBoxes.innerText.includes(liDevice.innerText))) {
            liDevice.style.display = 'none';
        }
    }
}

const currentInstrumentsDevices = (currentRecipe, containerBoxes) => {
    let currentInstrumentsDevices = currentRecipe.querySelectorAll('.card__recipe__body');
    console.log(thirdDropDown)
        for(let i = 0; i < currentInstrumentsDevices.length; i++) {
            let currentInstruments = currentInstrumentsDevices[i].innerText;
            for(let j = 0; j < thirdDropDown.length; j++) {
                let currentInstrumentsInDropDown = thirdDropDown[j].toLowerCase();
                if(currentInstruments.toLowerCase().trim().includes(currentInstrumentsInDropDown)) {
                    if((containerBoxes.innerText.search(currentInstrumentsInDropDown[0].toUpperCase() + currentInstrumentsInDropDown.slice(1)))) {
                        addLineInDropDown(dropDownListInstruments, currentInstrumentsInDropDown);
                    }
                }
            }
        }
}

const refreshInstrumentsDropDown = (containerBoxes) => {
    let liInstruments = document.querySelectorAll('.dropdown--fifth ul li');
    for(let i = 0; i < liInstruments.length; i++) {
        let liInstrument = liInstruments[i];
        if((containerBoxes.innerText.includes(liInstrument.innerText))) {
            liInstrument.style.display = 'none';
        }
    }
}