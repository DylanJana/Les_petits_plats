import { arrayRecipes, arrayRecipesUstensilsJSON, arrayRecipesAppliancesInJSON, arrayUstensils, arrayIngredients, arrayAppliances } from "../../pages/dispatchRecipes.js";
import { createLinesInDDUstensils, createLinesInDDIngredients, createLinesInDDAppliances } from "../dropdowns/dropdowns.js";

console.log("Array recipes ", arrayRecipesAppliancesInJSON)
export const searchWordInRecipes = () => {
    let searchBar = document.querySelector("#search");

    searchBar.addEventListener('keyup', (e) => {
        let query = e.target.value.toLowerCase();
        
        if(query.length >= 3) {
            searchRecipes(query, arrayRecipes);
        } else if(query.length < 3) {
            createLinesInDDIngredients(arrayIngredients);
            createLinesInDDAppliances(arrayAppliances);
            createLinesInDDUstensils(arrayUstensils);
        }
    })
}

const searchRecipes = (query, arrayRecipes) => {
    let arrayRecipesUnavailables = [];
    let arrayIngredientsAvailables = [];
    let arrayAppliancesAvailables = [];
    let arrayUstensilsAvailables = [];
    for(let i = 0; i < arrayRecipes.length; i++) {
        let currentRecipe = arrayRecipes[i];
        let recipeAvaible = currentRecipe.querySelector('.card__recipe__body');
        let recipeAvaibleContent = recipeAvaible.innerText;
        if(!(recipeAvaibleContent.toLowerCase().includes(query))) {
            currentRecipe.classList.remove('avaible__recipe');
            currentRecipe.style.display = 'none';
            arrayRecipesUnavailables.push(currentRecipe);
        } else {
            let indexOfCurrentRecipe = arrayRecipes.indexOf(currentRecipe);
            getIngredientsOfMyRecipe(arrayIngredients, currentRecipe, arrayIngredientsAvailables);
            getAppliancesOfMyRecipe(indexOfCurrentRecipe, arrayAppliancesAvailables);
            getUstensilsOfMyRecipe(indexOfCurrentRecipe, arrayUstensilsAvailables);
        }
    }
    searchRecipesAfterBackspace(arrayRecipesUnavailables);
}

const searchRecipesAfterBackspace = (arrayRecipesUnavaibles) => {
    let searchBar = document.querySelector("#search");
    searchBar.addEventListener('keyup', (e) => {
        if(e.keyCode === 8) {
            let query = e.target.value.toLowerCase();
            if(query.length >= 3) {
                searchRecipesMoreThreeChar(query, arrayRecipesUnavaibles);
            } else if(arrayRecipes.length !== arrayRecipesUnavaibles.length) {
                reloadWrapper(arrayRecipesUnavaibles);
            }
        }
    })
}

const searchRecipesMoreThreeChar = (query, arrayRecipesUnavaibles) => {
    for(let i = 0; i < arrayRecipesUnavaibles.length; i++) {
        let currentRecipe = arrayRecipesUnavaibles[i];
        let unAvailableRecipe = currentRecipe.querySelector('.card__recipe__body');
        let recipeUnAvaibleContent = unAvailableRecipe.innerText;
        if(recipeUnAvaibleContent.toLowerCase().includes(query)) {
            currentRecipe.classList.add('avaible__recipe');
            currentRecipe.style.display = 'inline-flex';
        }
    }
}

const reloadWrapper = (arrayRecipesUnavaibles) => {
    for(let i = 0; i < arrayRecipesUnavaibles.length; i++) {
        arrayRecipesUnavaibles[i].classList.add('avaible__recipe');
        arrayRecipesUnavaibles[i].removeAttribute('style');
    }
}

const getIngredientsOfMyRecipe = (arrayIngredients, currentRecipe, arrayIngredientsAvailables) => {
    let currentListRecipe = currentRecipe.querySelector('.recipe__list');
    let currentIngredientsNames = currentListRecipe.querySelectorAll('li span');
    for(let i = 0; i < currentIngredientsNames.length; i++) {
        for(let j = 0; j < arrayIngredients.length; j++) {
            let currentIngredient = arrayIngredients[j];
            if(currentIngredient === currentIngredientsNames[i].innerText.trim()) {
                if(arrayIngredientsAvailables.indexOf(currentIngredient) < 0) {
                    arrayIngredientsAvailables.push(currentIngredient);
                }
            }
        }
    }
    createLinesInDDIngredients(arrayIngredientsAvailables);
}

const getAppliancesOfMyRecipe = (indexOfCurrentRecipe, arrayAppliancesAvailables) => {
    for(let i = 0; i < arrayRecipesAppliancesInJSON.length; i++) {
        if( i === indexOfCurrentRecipe) {
            let currentRecipeAppliancesJSON = arrayRecipesAppliancesInJSON[i];
            if(arrayAppliancesAvailables.indexOf(currentRecipeAppliancesJSON) < 0) {
                arrayAppliancesAvailables.push(currentRecipeAppliancesJSON);
            }
        }
    }
    createLinesInDDAppliances(arrayAppliancesAvailables);
}

const getUstensilsOfMyRecipe = (indexOfCurrentRecipe, arrayUstensilsAvailables) => {
    for(let i = 0; i < arrayRecipesUstensilsJSON.length; i++) {
        let currentRecipeUstensilsJSON = arrayRecipesUstensilsJSON[i];
        if((arrayRecipesUstensilsJSON.indexOf(currentRecipeUstensilsJSON) === indexOfCurrentRecipe)) {
            for(let j= 0; j < currentRecipeUstensilsJSON.length; j++) {
                if(arrayUstensilsAvailables.indexOf(currentRecipeUstensilsJSON[j]) < 0) {
                    arrayUstensilsAvailables.push(currentRecipeUstensilsJSON[j])
                }
            }
        }
    }
    createLinesInDDUstensils(arrayUstensilsAvailables);
}