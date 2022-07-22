import { arrayIngredientsAvailables, arrayAppliancesAvailables, arrayUstensilsAvailables } from './tagsFilter.js';
import { arrayTagsIngredients, arrayTagsAppliances, arrayTagsUstensils, arrayFullTags } from './createTags.js'; 
import { arrayIngredients, arrayAppliances, arrayRecipes, dispatchRecipes, arrayRecipesUstensilsJSON } from '../../pages/dispatchRecipes.js';
import {  getIngredientsOfMyRecipe, getAppliancesOfMyRecipe, getUstensilsOfMyRecipe, reloadWrapper, searchRecipes } from '../search/searchBar.js';
import { removeLineInDropDown } from '../dropdowns/dropdowns.js';
import { inputAppliancesSearch, inputIngredientsSearch, inputUstensilsSearch } from '../search/searchBardAdvanced.js';

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

export const cleanDropDown = (dropDownItems, arrayItemsAvaibles, arrayTagsUses) => {
    for(let i = 0; i < arrayItemsAvaibles.length; i++) {
        for(let j = 0; j < arrayTagsUses.length; j++) {
            if(arrayItemsAvaibles[i] === arrayTagsUses[j]) {
                removeLineInDropDown(dropDownItems, arrayTagsUses[j])
            }
        }
    }
}

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