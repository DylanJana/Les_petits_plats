import { unAvailableRecipe } from "./tagsFilter.js";
import { arrayTagsIngredients, arrayTagsAppliances, arrayTagsUstensils, arrayFullTags } from "./createTags.js";
import { refreshWrapperByIngredients, refreshWrapperByUstensils, updateArrayFullTags } from "./tagsDropdown.js";
import { addLineInDropDown } from "../dropdowns/dropdowns.js";

// This function is run when user delete a ingredient tag. His role is to show recipes excludes by this tag, if they match with remanings informations.
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
    // Remove this ingredient tag of the arrayTagsIngredients
    if(findIndexIngredientDelete > -1) {
        arrayTagsIngredients.splice(findIndexIngredientDelete, 1);
    }

    // For each tags presents in the arrayFullTags, I refresh ingredients dropdown menu if current tag is a ingredient tag(tag--tiers) etc..
    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            refreshWrapperByIngredients(unAvailableRecipe,tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            refreshWrapperByUstensils(unAvailableRecipe,tagBoxCategory.innerText);
        }
    }
}

// This function is run when user delete a appliance tag. His role is to show recipes excludes by this tag, if they match with remanings informations.
const deleteTagAppliance = (tagValue) => {
    let findIndexApplianceDelete = arrayTagsAppliances.indexOf(tagValue);
    let dropDownAppliances = document.querySelector('.dropdown--quarts ul')
    addLineInDropDown(dropDownAppliances, tagValue);
    // Remove this appliance tag of the arrayTagsAppliances
    if(findIndexApplianceDelete > -1) {
        arrayTagsAppliances.splice(findIndexApplianceDelete, 1);
    }

    // For each tags presents in the arrayFullTags, I refresh ingredients dropdown menu if current tag is a ingredient tag(tag--tiers) etc..
    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            refreshWrapperByIngredients(unAvailableRecipe,tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            refreshWrapperByUstensils(unAvailableRecipe,tagBoxCategory.innerText);
        }
    }
}

// This function is run when user delete a ustensil tag. His role is to show recipes excludes by this tag, if they match with remanings informations.
const deleteTagUstensils = (tagValue) => {
    let findIndexUstensilsDelete = arrayTagsUstensils.indexOf(tagValue);
    let dropDownUstensils = document.querySelector('.dropdown--fifth ul')
    addLineInDropDown(dropDownUstensils, tagValue);
    // Remove this ustensil tag of the arrayTagsUstensils
    if(findIndexUstensilsDelete > -1) {
        arrayTagsUstensils.splice(findIndexUstensilsDelete, 1);
    }

    // For each tags presents in the arrayFullTags, I refresh ingredients dropdown menu if current tag is a ingredient tag(tag--tiers) etc..
    for(let i = 0; i < arrayFullTags.length; i++) {
        let tagBoxCategory = arrayFullTags[i].querySelector('.box__tag__content');
        if(tagBoxCategory.classList.contains('tag--tiers')) {
            refreshWrapperByIngredients(unAvailableRecipe,tagBoxCategory.innerText);
        } else if(tagBoxCategory.classList.contains('tag--fifth')) {
            refreshWrapperByUstensils(unAvailableRecipe,tagBoxCategory.innerText);
        }
    }
}

// At every time user delete a tag, I run this function
export const refreshAfterDeleteTag = (tagBoxDiv, tagValue) => {
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