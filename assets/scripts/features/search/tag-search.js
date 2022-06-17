import { addLineInDropDown } from "../../pages/app.js";
import { firstDropDown, dropDownList } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown } from "../dropdowns/dropdown-devices.js";
import { thirdDropDown } from "../dropdowns/dropdown-instruments.js";
import{ itemListDisabledOnClick } from "../tags/tags.js";

export const itemsInDropDown = () => {
    let avaiblesRecipes = document.querySelectorAll('.avaible__recipe');
    ingredientsCurrentRecipe(avaiblesRecipes);
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
        console.log(avaiblesIngredients[i])
        for(let j = 0; j < firstDropDown.length; j++) {
            if(avaiblesIngredients[i].toLowerCase().trim() === firstDropDown[j].toLowerCase()) {
                addLineInDropDown(dropDownList ,firstDropDown[j]);
            }
        }
    }
}