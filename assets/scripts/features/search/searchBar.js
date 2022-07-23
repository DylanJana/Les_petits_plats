import { arrayRecipes, arrayRecipesUstensilsJSON, arrayRecipesAppliancesInJSON, arrayUstensils, arrayIngredients, arrayAppliances, dispatchRecipes } from "../../pages/dispatchRecipes.js";
import { createLinesInDDUstensils, createLinesInDDIngredients, createLinesInDDAppliances } from "../dropdowns/dropdowns.js";
/*** Search Advanced ***/
import { inputIngredientsSearch, inputAppliancesSearch, inputUstensilsSearch } from "../search/searchBardAdvanced.js";
let wrapperContainer = document.createElement('div');
let allBtnDisabled = document.querySelectorAll('.btn');

export const searchWordInRecipes = () => {
    let searchBar = document.querySelector("#search");

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

export const searchRecipes = (query, arrayRecipes) => {
    let arrayIngredientsAvailables = [];
    let arrayRecipesUnavailables = [];
    let arrayAppliancesAvailables = [];
    let arrayUstensilsAvailables = [];

    const checkRecipeIsAvailabe = (currentRecipe) => {
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

    arrayRecipes.filter(checkRecipeIsAvailabe);
    
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
            } else if(query.length <= 3) {
                removeClassDisabled();
            }
        }
    })
}

const searchRecipesMoreThreeChar = (query, arrayRecipesUnavaibles) => {

    const checkRecipeIsAvaibleNow = (currentRecipe) => {
        let unAvailableRecipe = currentRecipe.querySelector('.card__recipe__body');
        let recipeUnAvaibleContent = unAvailableRecipe.innerText;
        if(recipeUnAvaibleContent.toLowerCase().includes(query)) {
            currentRecipe.classList.add('avaible__recipe');
            currentRecipe.style.display = 'inline-flex';
            wrapperContainer.style.display = "none";
            if(wrapperContainer.hasAttribute('style')) {
                removeClassDisabled();
            }
        }
    }

    arrayRecipesUnavaibles.filter(checkRecipeIsAvaibleNow)
}

export const reloadWrapper = (arrayRecipesUnavaibles) => {
    arrayRecipesUnavaibles.forEach(arrayRecipeUnavaible => {
        arrayRecipeUnavaible.classList.add('avaible__recipe');
        arrayRecipeUnavaible.removeAttribute('style');
    })
}

export const getIngredientsOfMyRecipe = (arrayIngredients, currentRecipe, arrayIngredientsAvailables) => {
    let currentListRecipe = currentRecipe.querySelector('.recipe__list');
    let currentIngredientsNames = currentListRecipe.querySelectorAll('li span');
    currentIngredientsNames.forEach(currentIngredientsName => {
        arrayIngredients.forEach(ingredient => {
            if(ingredient === currentIngredientsName.innerText.trim()) {
                if((arrayIngredientsAvailables.indexOf(ingredient) < 0)) {
                    arrayIngredientsAvailables.push(ingredient);
                }
            }
        })
    })
    createLinesInDDIngredients(arrayIngredientsAvailables);
}


export const getAppliancesOfMyRecipe = (indexOfCurrentRecipe, arrayAppliancesAvailables) => {
   const indexIsSame = (appliance, index) => {
        if(index === indexOfCurrentRecipe) {
            if(arrayAppliancesAvailables.indexOf(appliance) < 0) {
                arrayAppliancesAvailables.push(appliance);
            }
        }
   }

    arrayRecipesAppliancesInJSON.forEach(indexIsSame);
    createLinesInDDAppliances(arrayAppliancesAvailables);
}

export const getUstensilsOfMyRecipe = (indexOfCurrentRecipe, arrayUstensilsAvailables) => {
    arrayRecipesUstensilsJSON.forEach(ustensil => {
        if((arrayRecipesUstensilsJSON.indexOf(ustensil) === indexOfCurrentRecipe)) {
            ustensil.forEach(currentUstensil => {
                if(arrayUstensilsAvailables.indexOf(currentUstensil) < 0) {
                    arrayUstensilsAvailables.push(currentUstensil)
                }
            })
        }
    })

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

        allBtnDisabled.forEach(btnDisabled => {
            btnDisabled.classList.add("btn--disabled");
        })
    }
}

const removeClassDisabled = () => {
    allBtnDisabled.forEach(btnDisabled => {
        btnDisabled.classList.remove("btn--disabled");
    })
}