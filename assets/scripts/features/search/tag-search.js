import { addLineInDropDown } from "../../pages/app.js";
import { firstDropDown, dropDownList } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown } from "../dropdowns/dropdown-devices.js";
import { thirdDropDown } from "../dropdowns/dropdown-instruments.js";
import{ itemListDisabledOnClick } from "../tags/tags.js";

let dropDownListDevices = document.querySelector('.dropdown--quarts ul');

export const itemsInDropDown = () => {
    let avaiblesRecipes = document.querySelectorAll('.avaible__recipe');
    ingredientsCurrentRecipe(avaiblesRecipes);
    devicesCurrentRecipe(avaiblesRecipes);
    itemListDisabledOnClick();
    //console.log("Array ingredients ", avaiblesIngredients);
    console.log("First Drop Down ", firstDropDown);
    console.log("Second Drop Down ", secondDropDown);
    console.log("Third Drop Down ", thirdDropDown);
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
    for(let i = 0 ; i < avaiblesIngredients.length; i++) {
        for(let j = 0; j < firstDropDown.length; j++) {
            if(avaiblesIngredients[i].toLowerCase().trim() === firstDropDown[j].toLowerCase()) {
                addLineInDropDown(dropDownList ,firstDropDown[j]);
            }
        }
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
