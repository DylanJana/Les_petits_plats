import { arrayIngredients, arrayAppliances, arrayUstensils, arrayRecipes, arrayRecipesAppliancesInJSON, dispatchRecipes, arrayRecipesUstensilsJSON } from '../../pages/dispatchRecipes.js';
import {  getIngredientsOfMyRecipe, getAppliancesOfMyRecipe, getUstensilsOfMyRecipe, reloadWrapper, searchRecipes } from '../search/searchBar.js';
import { removeLineInDropDown, addLineInDropDown } from '../dropdowns/dropdowns.js';
import { inputAppliancesSearch, inputIngredientsSearch, inputUstensilsSearch } from '../search/searchBardAdvanced.js';

let arrayFullTags = [];
export let arrayTagsIngredients = [];
export let arrayTagsAppliances = [];
export let arrayTagsUstensils = [];
let arrayIngredientsAvailables = [];
let arrayAppliancesAvailables = [];
let arrayUstensilsAvailables = [];
let unAvailableRecipe = [];
let arrayAppliancesSearchAdvanced = [];

export function findTagValueClick(tagValue) {
    createTags(tagValue);
};

const createTags = (tagValue) => {
    let dropDownIngredients = document.querySelectorAll('.dropdown--tiers ul li');
    for(let i = 0; i < dropDownIngredients.length; i++) {
        let itemIngredient = dropDownIngredients[i].querySelector('a').innerText;
        if(itemIngredient === tagValue) {
            createTagIngredient(tagValue, arrayTagsIngredients);
            dropDownIngredients[i].style.display = "none";
        }
    }

    let dropDownAppliances = document.querySelectorAll('.dropdown--quarts ul li');
    for(let i = 0; i < dropDownAppliances.length; i++) {
        let itemAppliance = dropDownAppliances[i].querySelector('a').innerText;
        if(itemAppliance === tagValue) {
            createTagsAppliance(tagValue, arrayTagsAppliances);
            dropDownAppliances[i].style.display = "none";
        }
    }

    let dropDownUstensils = document.querySelectorAll('.dropdown--fifth ul li');
    for(let i = 0; i < dropDownUstensils.length; i++) {
        let itemAppliance = dropDownUstensils[i].querySelector('a').innerText;
        if(itemAppliance === tagValue) {
            createTagsUstensils(tagValue, arrayTagsUstensils);
            dropDownUstensils[i].style.display = "none";
        }
    }
    searchWithRestTags(arrayFullTags);
}

const createTagIngredient = (tagValue, arrayTagsIngredients) => {
    let tagBoxContainer = document.querySelector('.box__tag__container');
    let tagBoxDiv = document.createElement('div');
    tagBoxDiv.classList.add('column', 'col-sm-3', 'column__tag');
    tagBoxContainer.appendChild(tagBoxDiv);
    let tagBox = `
        <div class="box__tag__content flex align-items--start justify-content--space-between tag--tiers">
            <p class="paragraph">${tagValue}</p>
            <span class="far fa-times-circle"></span>
        </div>
    `
    tagBoxDiv.innerHTML = tagBox;
    arrayTagsIngredients.push(tagValue);
    arrayFullTags.push(tagBoxDiv);
    console.log("Array ingredients ", arrayTagsIngredients);
    console.log("Array full tags ", arrayFullTags);
    closeTags(tagBoxDiv, tagValue);
}

const createTagsAppliance = (tagValue, arrayTagsAppliances) => {
    let tagBoxContainer = document.querySelector('.box__tag__container');
    let tagBoxDiv = document.createElement('div');
    tagBoxDiv.classList.add('column', 'col-sm-3', 'column__tag');
    tagBoxContainer.appendChild(tagBoxDiv);
    let tagBox = `
        <div class="box__tag__content flex align-items--start justify-content--space-between tag--quarts">
            <p class="paragraph">${tagValue}</p>
            <span class="far fa-times-circle"></span>
        </div>
    `
    tagBoxDiv.innerHTML = tagBox;
    arrayTagsAppliances.push(tagValue);
    arrayFullTags.push(tagBoxDiv);
    closeTags(tagBoxDiv, tagValue);
    console.log("Array appliances ", arrayTagsAppliances);
    console.log("Array full tags ", arrayFullTags);

}

const createTagsUstensils = (tagValue, arrayTagsUstensils) => {
    let tagBoxContainer = document.querySelector('.box__tag__container');
    let tagBoxDiv = document.createElement('div');
    tagBoxDiv.classList.add('column', 'col-sm-3', 'column__tag');
    tagBoxContainer.appendChild(tagBoxDiv);
    let tagBox = `
        <div class="box__tag__content flex align-items--start justify-content--space-between tag--fifth">
            <p class="paragraph">${tagValue}</p>
            <span class="far fa-times-circle"></span>
        </div>
    `
    tagBoxDiv.innerHTML = tagBox;
    arrayTagsUstensils.push(tagValue);
    arrayFullTags.push(tagBoxDiv);
    closeTags(tagBoxDiv, tagValue);
}

const filterRecipeByIngredients = (tagValue) => {
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

const filterRecipesByAppliances = (tagValue) => {
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

const filterRecipeByUstensils = (tagValue) => {
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

const reloadDropDown =  (currentRecipe) => {
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

const cleanDropDown = (dropDownItems, arrayItemsAvaibles, arrayTagsUses) => {
    for(let i = 0; i < arrayItemsAvaibles.length; i++) {
        for(let j = 0; j < arrayTagsUses.length; j++) {
            if(arrayItemsAvaibles[i] === arrayTagsUses[j]) {
                removeLineInDropDown(dropDownItems, arrayTagsUses[j])
            }
        }
    }
}

const closeTags = (tagBoxDiv, tagValue) => {
    let closeTag = tagBoxDiv.querySelector('span');
    closeTag.addEventListener('click', (e) => {
        e.preventDefault();
        tagBoxDiv.remove();
        refreshAfterDeleteTag(tagBoxDiv, tagValue);
        searchWithRestTags(arrayFullTags);
    })
}

const refreshAfterDeleteTag = (tagBoxDiv, tagValue) => {
    let tagBoxCategory = tagBoxDiv.querySelector('.box__tag__content');
    if(tagBoxCategory.classList.contains('tag--tiers')) {
        for(let i = 0; i < unAvailableRecipe.length; i++) {
            let recipeIngredientsList = unAvailableRecipe[i].querySelectorAll('.recipe__list li span');
            let currentRecipe = unAvailableRecipe[i];
            deleteTagIngredient(recipeIngredientsList, tagValue, currentRecipe)
        }
    } else if(tagBoxCategory.classList.contains('tag--quarts')) {
            deleteTagAppliance(tagValue);
    } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            deleteTagUstensils(tagValue);
    }


    updateArrayFullTags(tagBoxDiv, tagValue);
}

const deleteTagIngredient = (recipeIngredientsList, tagValue, currentRecipe) => {
    for(let i = 0; i < recipeIngredientsList.length; i++) {
        for(let j = 0; j < arrayTagsIngredients.length; j++) {
            if((recipeIngredientsList[i].innerText.trim().toLowerCase() === arrayTagsIngredients[j].toLowerCase()) && (recipeIngredientsList[i].innerText.trim().toLowerCase() !== tagValue.toLowerCase())) {
                currentRecipe.style.display = "inline-flex";
                currentRecipe.classList.add('avaible__recipe');
                getIngredientsOfMyRecipe(arrayIngredients, currentRecipe, arrayIngredientsAvailables);
                let indexOfCurrentRecipe = arrayRecipes.indexOf(currentRecipe);
                getAppliancesOfMyRecipe(indexOfCurrentRecipe, arrayAppliancesAvailables);
                getUstensilsOfMyRecipe(indexOfCurrentRecipe, arrayUstensilsAvailables);
                let dropDownItems = document.querySelectorAll('.dropdown--tiers ul li');
                cleanDropDown(dropDownItems, arrayIngredientsAvailables, arrayTagsIngredients);
            }
        }
    }

    let findIndexIngredientDelete = arrayTagsIngredients.indexOf(tagValue);
    if(findIndexIngredientDelete > -1) {
        arrayTagsIngredients.splice(findIndexIngredientDelete, 1);
    }

    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            refreshWrapperByIngredients(unAvailableRecipe,tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            refreshWrapperByUstensils(unAvailableRecipe,tagBoxCategory.innerText);
        }
    }
}

const deleteTagAppliance = (tagValue) => {
    let findIndexApplianceDelete = arrayTagsAppliances.indexOf(tagValue);
    let dropDownAppliances = document.querySelector('.dropdown--quarts ul')
    addLineInDropDown(dropDownAppliances, tagValue)
    if(findIndexApplianceDelete > -1) {
        arrayTagsAppliances.splice(findIndexApplianceDelete, 1);
    }

    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            refreshWrapperByIngredients(unAvailableRecipe,tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            refreshWrapperByUstensils(unAvailableRecipe,tagBoxCategory.innerText);
        }
    }
}

const deleteTagUstensils = (tagValue) => {
    let findIndexUstensilsDelete = arrayTagsUstensils.indexOf(tagValue);
    let dropDownUstensils = document.querySelector('.dropdown--fifth ul')
    addLineInDropDown(dropDownUstensils, tagValue)
    if(findIndexUstensilsDelete > -1) {
        arrayTagsUstensils.splice(findIndexUstensilsDelete, 1);
    }

    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            refreshWrapperByIngredients(unAvailableRecipe,tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            refreshWrapperByUstensils(unAvailableRecipe,tagBoxCategory.innerText);
        }
    }
}

const refreshWrapperByIngredients = (unAvailableRecipe, tagValue) => {
    for(let i = 0; i < unAvailableRecipe.length; i++) {
        let recipeList = unAvailableRecipe[i].querySelector('.recipe__list')
        if(recipeList.innerText.toLowerCase().includes(tagValue.toLowerCase())) {
            unAvailableRecipe[i].style.display = "inline-flex";
            unAvailableRecipe[i].classList.add('avaible__recipe')
            reloadDropDown(unAvailableRecipe[i]);
        }
    }
}

const refreshWrapperByUstensils = (unAvailableRecipe, tagValue) => {
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

const searchWithRestTags = (arrayFullTags) => {
    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            filterRecipeByIngredients(tagBoxCategory.innerText);
        } else if (tagBoxCategory.classList.contains('tag--quarts')) {
            filterRecipesByAppliances(tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            filterRecipeByUstensils(tagBoxCategory.innerText);
        }
    }
}

const updateArrayFullTags = (tagBoxDiv) => {
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