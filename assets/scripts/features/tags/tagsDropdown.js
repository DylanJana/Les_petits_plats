import { arrayIngredientsAvailables, arrayAppliancesAvailables, arrayUstensilsAvailables } from './tagsFilter.js';
import { arrayTagsIngredients, arrayTagsAppliances, arrayTagsUstensils, arrayFullTags } from './createTags.js'; 
import { arrayIngredients, arrayAppliances, arrayRecipes, dispatchRecipes, arrayRecipesUstensilsJSON } from '../../pages/dispatchRecipes.js';
import {  getIngredientsOfMyRecipe, getAppliancesOfMyRecipe, getUstensilsOfMyRecipe, reloadWrapper, searchRecipes } from '../search/searchBar.js';
import { removeLineInDropDown } from '../dropdowns/dropdowns.js';
import { inputAppliancesSearch, inputIngredientsSearch, inputUstensilsSearch } from '../search/searchBardAdvanced.js';

// This function reload dropdowns after each changes
export const reloadDropDown =  (currentRecipe) => {
    let indexOfCurrentRecipe =  arrayRecipes.indexOf(currentRecipe)
    getIngredientsOfMyRecipe(arrayIngredients, currentRecipe, arrayIngredientsAvailables);
    getAppliancesOfMyRecipe(indexOfCurrentRecipe, arrayAppliancesAvailables);
    getUstensilsOfMyRecipe(indexOfCurrentRecipe, arrayUstensilsAvailables);
    let dropDownItems = document.querySelectorAll('.dropdown--tiers ul li');
    cleanDropDown(dropDownItems, arrayIngredientsAvailables, arrayTagsIngredients);
    inputIngredientsSearch(arrayIngredientsAvailables);
    let dropDownAppliances = document.querySelectorAll('.dropdown--quarts ul li');
    cleanDropDown(dropDownAppliances, arrayAppliancesAvailables, arrayTagsAppliances);
    inputAppliancesSearch(arrayAppliancesAvailables);
    let dropDownUstensils = document.querySelectorAll('.dropdown--fifth ul li');
    cleanDropDown(dropDownUstensils, arrayUstensilsAvailables, arrayTagsUstensils);
    inputUstensilsSearch(arrayUstensilsAvailables);
}

// At every time user choose a tag, I run this function to delete the line in my dropdown who match with the tag chooses
export const cleanDropDown = (dropDownItems, arrayItemsAvaibles, arrayTagsUses) => {
    for(let i = 0; i < arrayItemsAvaibles.length; i++) {
        for(let j = 0; j < arrayTagsUses.length; j++) {
            if(arrayItemsAvaibles[i] === arrayTagsUses[j]) {
                removeLineInDropDown(dropDownItems, arrayTagsUses[j])
            }
        }
    }
}

// This function is run to refresh my website with the recipes matches with my ingredients remaining
export const refreshWrapperByIngredients = (unAvailableRecipe, tagValue) => {
    for(let i = 0; i < unAvailableRecipe.length; i++) {
        let recipeList = unAvailableRecipe[i].querySelector('.recipe__list')
        if(recipeList.innerText.toLowerCase().includes(tagValue.toLowerCase())) {
            unAvailableRecipe[i].style.display = "inline-flex";
            unAvailableRecipe[i].classList.add('avaible__recipe')
            reloadDropDown(unAvailableRecipe[i]);
        }
    }
}

// This function is run to refresh my website with the recipes matches with my ustensils remaining
export const refreshWrapperByUstensils = (unAvailableRecipe, tagValue) => {
    let indexOfRecipesAvailables = [];
    for(let i = 0; i < arrayRecipesUstensilsJSON.length; i++) {
        for(let j = 0; j < arrayRecipesUstensilsJSON[i].length; j++) {
            if(arrayRecipesUstensilsJSON[i][j].toLowerCase() === tagValue.toLowerCase()) {
                let indexOfRecipesWithUstensil = arrayRecipesUstensilsJSON.indexOf(arrayRecipesUstensilsJSON[i]);
                indexOfRecipesAvailables.push(indexOfRecipesWithUstensil)
            }
        }
    }

    for(let i = 0; i <  unAvailableRecipe.length; i++) {
        let indexRecipe = arrayRecipes.indexOf( unAvailableRecipe[i]);
        if(indexOfRecipesAvailables.includes(indexRecipe)) {
            unAvailableRecipe[i].style.display = "inline-flex";
            unAvailableRecipe[i].classList.add('avaible__recipe')
        }
    }
}

// This function is run to refresh my arrayFullTags
export const updateArrayFullTags = (tagBoxDiv) => {
    let findIndexOfElmt = arrayFullTags.indexOf(tagBoxDiv);
    if(findIndexOfElmt > -1) {
        arrayFullTags.splice(findIndexOfElmt, 1);
    }

    let searchPrincipal = document.querySelector('#search');
    if(((arrayFullTags.length === 0) && (searchPrincipal.value === '')) || ((arrayFullTags.length === 0) && (searchPrincipal.value.length < 3))) {
        dispatchRecipes();
        inputIngredientsSearch(arrayIngredients);
    } else if((arrayFullTags.length === 0) && (searchPrincipal.value.length >= 3)) {
        reloadWrapper(arrayRecipes);
        searchRecipes(searchPrincipal.value, arrayRecipes);
        inputIngredientsSearch(arrayIngredients);
        inputAppliancesSearch(arrayAppliances);
    }
}