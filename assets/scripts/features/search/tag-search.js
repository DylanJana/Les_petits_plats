import { addLineInDropDown } from "../../pages/app.js";
import { firstDropDown, dropDownList } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown } from "../dropdowns/dropdown-devices.js";
import { thirdDropDown } from "../dropdowns/dropdown-instruments.js";
import{ itemListDisabledOnClick } from "../tags/tags.js";

let dropDownListDevices = document.querySelector('.dropdown--quarts ul');
let dropDownListInstruments = document.querySelector('.dropdown--fifth ul');

export const itemsInDropDown = () => {
    let avaiblesRecipes = document.querySelectorAll('.avaible__recipe');
    ingredientsCurrentRecipe(avaiblesRecipes);
    devicesCurrentRecipe(avaiblesRecipes);
    instrumentsCurrentRecipe(avaiblesRecipes);
    itemListDisabledOnClick();
}



const ingredientsCurrentRecipe = (avaiblesRecipes) => {
    let avaiblesIngredients = [];
    for(let i = 0; i < avaiblesRecipes.length; i++) {
        let currentRecipeIngredients = avaiblesRecipes[i].querySelectorAll('.recipe__list li span');
        for(let j = 0; j < currentRecipeIngredients.length; j++ ) {
            let currentIngredient = currentRecipeIngredients[j].textContent;
            avaiblesIngredients.push(currentIngredient);
        }
    }

    createCurrentIngredients(avaiblesIngredients)
}

const createCurrentIngredients = (avaiblesIngredients) => {
    dropDownList.innerHTML = '';
    let ingredientsArray = [];
    for(let i = 0 ; i < avaiblesIngredients.length; i++) {
        for(let j = 0; j < firstDropDown.length; j++) {
            if(avaiblesIngredients[i].toLowerCase().trim() === firstDropDown[j].toLowerCase()) {
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


const devicesCurrentRecipe = (avaiblesRecipes) => {
    let avaiblesDevices = [];
    for(let i = 0; i < avaiblesRecipes.length; i++) {
        let currentRecipeDevices = avaiblesRecipes[i].querySelectorAll('.recipe__desc');
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

const instrumentsCurrentRecipe = (avaiblesRecipes) => {
    let avaiblesInstruments = [];
    for(let i = 0; i < avaiblesRecipes.length; i++) {
        let currentRecipeInstruments = avaiblesRecipes[i].querySelectorAll('.recipe__desc');
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