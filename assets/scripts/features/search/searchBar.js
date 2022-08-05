import { arrayRecipes, arrayRecipesUstensilsJSON, arrayRecipesAppliancesInJSON, arrayUstensils, arrayIngredients, arrayAppliances, dispatchRecipes } from "../../pages/dispatchRecipes.js";
import { createLinesInDDUstensils, createLinesInDDIngredients, createLinesInDDAppliances } from "../dropdowns/dropdowns.js";
/*** Search Advanced ***/
import { inputIngredientsSearch, inputAppliancesSearch, inputUstensilsSearch } from "../search/searchBardAdvanced.js";

let wrapperContainer = document.createElement('div');
let btnDisabled = document.querySelectorAll('.btn');

// This function is the principal function to search a word in a recipe
export const searchWordInRecipes = () => {
    let searchBar = document.querySelector("#search");

    // For each letter enter in the search bar this function is run
    searchBar.addEventListener('keyup', (e) => {
        let query = e.target.value.toLowerCase();
        
        if(query.length >= 3) {
            searchRecipes(query, arrayRecipes);
            let numberAvailablesRecipes = document.querySelectorAll('.avaible__recipe').length;
            sorryNotRecipes(numberAvailablesRecipes);
        } else if(query.length < 3) {
            createLinesInDDIngredients(arrayIngredients);
            createLinesInDDAppliances(arrayAppliances);
            createLinesInDDUstensils(arrayUstensils);
            if(query.length === 2) {
                dispatchRecipes();
            }
        }
    })
}

// This function search if my query match with a recipe in my website
export const searchRecipes = (query, arrayRecipes) => {
    let arrayIngredientsAvailables = [];
    let arrayRecipesUnavailables = [];
    let arrayAppliancesAvailables = [];
    let arrayUstensilsAvailables = [];

     // For each recipes : my query match with her or not ?
    for(let i = 0; i < arrayRecipes.length; i++) {
        let currentRecipe = arrayRecipes[i];
        let recipeAvaible = currentRecipe.querySelector('.card__recipe__body');
        let recipeAvaibleContent = recipeAvaible.innerText;

        // Not match, I remove avaible_recipe class and hide this recipe
        if(!(recipeAvaibleContent.toLowerCase().includes(query))) {
            currentRecipe.classList.remove('avaible__recipe');
            currentRecipe.style.display = 'none';
            arrayRecipesUnavailables.push(currentRecipe);
        } else {
            let indexOfCurrentRecipe = arrayRecipes.indexOf(currentRecipe);
            // My query match, I refresh my ingredients, appliances, ustensils dropdown menu
            getIngredientsOfMyRecipe(arrayIngredients, currentRecipe, arrayIngredientsAvailables);
            getAppliancesOfMyRecipe(indexOfCurrentRecipe, arrayAppliancesAvailables);
            getUstensilsOfMyRecipe(indexOfCurrentRecipe, arrayUstensilsAvailables);
        }
    }
    
    let numberAvailablesRecipes = document.querySelectorAll('.avaible__recipe').length;
    sorryNotRecipes(numberAvailablesRecipes);
    searchRecipesAfterBackspace(arrayRecipesUnavailables);
    inputIngredientsSearch(arrayIngredientsAvailables);
    inputAppliancesSearch(arrayAppliancesAvailables);
    inputUstensilsSearch(arrayUstensilsAvailables);
}

// My user delete a character of my query, I run again my search function
const searchRecipesAfterBackspace = (arrayRecipesUnavaibles) => {
    let searchBar = document.querySelector("#search");
    searchBar.addEventListener('keyup', (e) => {
        if(e.keyCode === 8) {
            let query = e.target.value.toLowerCase();
            if(query.length >= 3) {
                searchRecipesMoreThreeChar(query, arrayRecipesUnavaibles);
            } else if(arrayRecipes.length !== arrayRecipesUnavaibles.length) {
                reloadWrapper(arrayRecipesUnavaibles);
            } else if(query.length <= 3) {
                    removeClassDisabled();
            }
        }
    })
}

// My user add a character of my query, I check my unavaibles recipes and show an unavaible recipes if match with my query
const searchRecipesMoreThreeChar = (query, arrayRecipesUnavaibles) => {
    for(let i = 0; i < arrayRecipesUnavaibles.length; i++) {
        let currentRecipe = arrayRecipesUnavaibles[i];
        let unAvailableRecipe = currentRecipe.querySelector('.card__recipe__body');
        let recipeUnAvaibleContent = unAvailableRecipe.innerText;
        if(recipeUnAvaibleContent.toLowerCase().includes(query)) {
            currentRecipe.classList.add('avaible__recipe');
            currentRecipe.style.display = 'inline-flex';
            wrapperContainer.style.display = "none";
             // If wrapper has a attribute style, I remove this attribute
            if(wrapperContainer.hasAttribute('style')) {
                removeClassDisabled();
            }
        }
    }
}

// This function refresh my wrapper
export const reloadWrapper = (arrayRecipesUnavaibles) => {
    for(let i = 0; i < arrayRecipesUnavaibles.length; i++) {
        arrayRecipesUnavaibles[i].classList.add('avaible__recipe');
        arrayRecipesUnavaibles[i].removeAttribute('style');
    }
}

// For each avaible recipe, I get his ingredients. For each ingredient of my recipe if my ingredient match with a ingredient in this website then
//I add this ingredient in my array arrayIngredientsAvailables
export const getIngredientsOfMyRecipe = (arrayIngredients, currentRecipe, arrayIngredientsAvailables) => {
    let currentListRecipe = currentRecipe.querySelector('.recipe__list');
    let currentIngredientsNames = currentListRecipe.querySelectorAll('li span');
    for(let i = 0; i < currentIngredientsNames.length; i++) {
        for(let j = 0; j < arrayIngredients.length; j++) {
            let currentIngredient = arrayIngredients[j];
            if(currentIngredient === currentIngredientsNames[i].innerText.trim()) {
                if((arrayIngredientsAvailables.indexOf(currentIngredient) < 0)) {
                    arrayIngredientsAvailables.push(currentIngredient);
                }
            }
        }
    }
    // I create lines in my dropdown ingredients menu
    createLinesInDDIngredients(arrayIngredientsAvailables);
}

// For each avaible recipe, I get his appliance. If my appliance match with an appliance in this website then
//I add him in my arrayAppliancesAvailables array
export const getAppliancesOfMyRecipe = (indexOfCurrentRecipe, arrayAppliancesAvailables) => {
    for(let i = 0; i < arrayRecipesAppliancesInJSON.length; i++) {
        if( i === indexOfCurrentRecipe) {
            let currentRecipeAppliancesJSON = arrayRecipesAppliancesInJSON[i];
            if(arrayAppliancesAvailables.indexOf(currentRecipeAppliancesJSON) < 0) {
                arrayAppliancesAvailables.push(currentRecipeAppliancesJSON);
            }
        }
    }
    // I create lines in my dropdown appliances menu
    createLinesInDDAppliances(arrayAppliancesAvailables);
}

// For each avaible recipe, I get his ustensils. If my ustensil match with an ustensil in this website then
//I add him in my  arrayUstensilsAvailables
export const getUstensilsOfMyRecipe = (indexOfCurrentRecipe, arrayUstensilsAvailables) => {
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
    // I create lines in my dropdown ustensils menu
    createLinesInDDUstensils(arrayUstensilsAvailables);
}

// This function is run when none recipes are avaibles
const sorryNotRecipes = (numberAvailablesRecipes) => {
    if(numberAvailablesRecipes === 0) {
        wrapperContainer.classList.add('w--100');
        wrapperContainer.removeAttribute('style');
        let wrapper = document.querySelector('.wrapper');
        let messageNoRecipes = `
        <div class="flex justify-content--center align-items--center w--100">
            <div class="t--box-a">
                <p class="paragraph"> Aucune recette ne correspond à votre critère... Vous pouvez chercher " tarte aux pommes", "poisson", etc... </p>
            </div>
        </div>
        `;
        wrapperContainer.innerHTML = messageNoRecipes;
        wrapper.appendChild(wrapperContainer);

        for(let i = 0; i < btnDisabled.length; i++) {
            btnDisabled[i].classList.add("btn--disabled");
        }
    }
}

// I remove btn--disabled class on my dropdowns menus. Dropdowns menus are availables !
const removeClassDisabled = () => {
    for(let i = 0; i < btnDisabled.length; i++) {
        btnDisabled[i].classList.remove("btn--disabled");
    }
}