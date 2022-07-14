import { arrayRecipes, arrayRecipesUstensilsJSON, arrayRecipesAppliancesInJSON, arrayUstensils, arrayIngredients, arrayAppliances } from "../../pages/dispatchRecipes.js";
import { createLinesInDDUstensils, createLinesInDDIngredients, createLinesInDDAppliances } from "../dropdowns/dropdowns.js";
/*** Search Advanced ***/
import { inputIngredientsSearch, inputAppliancesSearch, inputUstensilsSearch } from "../search/searchBardAdvanced.js";

let wrapperContainer = document.createElement('div');
let btnDisabled = document.querySelectorAll('.btn')

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

export const searchRecipes = (query, arrayRecipes) => {
    let arrayIngredientsAvailables = [];
    let arrayRecipesUnavailables = [];
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
    let numberAvailablesRecipes = document.querySelectorAll('.avaible__recipe').length;
    sorryNotRecipes(numberAvailablesRecipes);
    searchRecipesAfterBackspace(arrayRecipesUnavailables);
    inputIngredientsSearch(arrayIngredientsAvailables);
    inputAppliancesSearch(arrayAppliancesAvailables);
    inputUstensilsSearch(arrayUstensilsAvailables);
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
            wrapperContainer.style.display = "none";
            if(wrapperContainer.hasAttribute('style')) {
                removeClassDisabled();
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

export const reloadWrapper = (arrayRecipesUnavaibles) => {
    for(let i = 0; i < arrayRecipesUnavaibles.length; i++) {
        arrayRecipesUnavaibles[i].classList.add('avaible__recipe');
        arrayRecipesUnavaibles[i].removeAttribute('style');
    }
}

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

const removeClassDisabled = () => {
    for(let i = 0; i < btnDisabled.length; i++) {
        btnDisabled[i].classList.remove("btn--disabled");
    }
}