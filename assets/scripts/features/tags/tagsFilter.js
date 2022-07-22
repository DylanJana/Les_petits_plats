
import { reloadDropDown, cleanDropDown } from './tagsDropdown.js';
import { arrayTagsIngredients, arrayTagsAppliances, arrayTagsUstensils } from './createTags.js';
import { arrayRecipes, arrayRecipesAppliancesInJSON, arrayRecipesUstensilsJSON } from '../../pages/dispatchRecipes.js';

export let arrayIngredientsAvailables = [];
export let arrayAppliancesAvailables = [];
export let arrayUstensilsAvailables = [];
export let unAvailableRecipe = [];

export const filterRecipeByIngredients = (tagValue) => {
    let recipesAvaibles = document.querySelectorAll('.avaible__recipe');
    arrayIngredientsAvailables = [];
    arrayAppliancesAvailables= [];
    arrayUstensilsAvailables = [];
    for(let i = 0; i < recipesAvaibles.length; i++) {
        let scored = 0;
        let recipeCurrentListItems = recipesAvaibles[i].querySelectorAll('.recipe__list li span');

        for(let j = 0; j < recipeCurrentListItems.length; j++) {
            let listItem = recipeCurrentListItems[j].innerText.trim().toLowerCase();
            if(tagValue.toLowerCase() === listItem) {
                scored++
            }
        }
        if(scored < 1) {
            recipesAvaibles[i].style.display = "none";
            recipesAvaibles[i].classList.remove('avaible__recipe');
            unAvailableRecipe.push(recipesAvaibles[i]);
        } else {
            reloadDropDown(recipesAvaibles[i]);
            let dropDownItems = document.querySelectorAll('.dropdown--tiers ul li');
            cleanDropDown(dropDownItems, arrayIngredientsAvailables, arrayTagsIngredients);
        }
    }
}

export const filterRecipesByAppliances = (tagValue) => {
    let recipePast = [];
    arrayIngredientsAvailables = [];
    arrayAppliancesAvailables= [];
    arrayUstensilsAvailables = [];

    for(let i = 0; i < arrayRecipes.length; i++) {
        for(let j = 0; j < arrayRecipesAppliancesInJSON.length; j++) {
            let currentApplianceAvailable = arrayRecipesAppliancesInJSON[i];
            if(currentApplianceAvailable !== tagValue) {
                arrayRecipes[i].style.display = "none";
                arrayRecipes[i].classList.remove('avaible__recipe');
                if(unAvailableRecipe.indexOf(arrayRecipes[i]) < 0) {
                    unAvailableRecipe.push(arrayRecipes[i]);
                }
            } else if(recipePast.indexOf(arrayRecipes[i]) < 0) {
                recipePast.push(arrayRecipes[i]);
                if(arrayTagsIngredients.length === 0 && arrayTagsUstensils.length === 0) {
                    arrayRecipes[i].style.display = "inline-flex";
                    arrayRecipes[i].classList.add('avaible__recipe');
                }
            }
        }
    }

    for(let i = 0; i < recipePast.length; i++) {
        let dropDownItems = document.querySelectorAll('.dropdown--quarts ul li');
        cleanDropDown(dropDownItems, arrayAppliancesAvailables, arrayTagsAppliances);
        if(recipePast[i].classList.contains('avaible__recipe')) {
            reloadDropDown(recipePast[i]);
        }
    }
}

export const filterRecipeByUstensils = (tagValue) => {
    let recipePast = [];
    let indexOfRecipesAvailables = [];
    let recipesAvaibles = document.querySelectorAll('.avaible__recipe');
    arrayIngredientsAvailables = [];
    arrayAppliancesAvailables= [];
    arrayUstensilsAvailables = [];

    for(let i = 0; i < arrayRecipesUstensilsJSON.length; i++) {
        for(let j = 0; j < arrayRecipesUstensilsJSON[i].length; j++) {
            if(arrayRecipesUstensilsJSON[i][j].toLowerCase() === tagValue.toLowerCase()) {
                let indexOfRecipesWithUstensil = arrayRecipesUstensilsJSON.indexOf(arrayRecipesUstensilsJSON[i]);
                indexOfRecipesAvailables.push(indexOfRecipesWithUstensil)
            }
        }
    }

    for(let i = 0; i < recipesAvaibles.length; i++) {
        let indexRecipe = arrayRecipes.indexOf(recipesAvaibles[i]);
        if(indexOfRecipesAvailables.includes(indexRecipe)) {
            recipesAvaibles[i].style.display = "inline-flex";
            recipePast.push(recipesAvaibles[i]);
        } else {
            recipesAvaibles[i].style.display = "none";
            recipesAvaibles[i].classList.remove('avaible__recipe');
            if(unAvailableRecipe.indexOf(recipesAvaibles[i]) < 0) {
                unAvailableRecipe.push(recipesAvaibles[i]);
            }
        }
    }
    
    for(let i = 0; i < recipePast.length; i++) {
        let dropDownItems = document.querySelectorAll('.dropdown--fifth ul li');
        cleanDropDown(dropDownItems, arrayUstensilsAvailables, arrayTagsUstensils);
        if(recipePast[i].classList.contains('avaible__recipe')) {
            reloadDropDown(recipePast[i]);
        }
    }
}
