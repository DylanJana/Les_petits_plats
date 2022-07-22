import { filterRecipeByIngredients, filterRecipeByUstensils, filterRecipesByAppliances } from './tagsFilter.js'
import { refreshAfterDeleteTag } from './tagsDelete.js';

export let arrayFullTags = [];
export let arrayTagsIngredients = [];
export let arrayTagsAppliances = [];
export let arrayTagsUstensils = [];

/*** CREATE TAGS */
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

const closeTags = (tagBoxDiv, tagValue) => {
    let closeTag = tagBoxDiv.querySelector('span');
    closeTag.addEventListener('click', (e) => {
        e.preventDefault();
        tagBoxDiv.remove();
        refreshAfterDeleteTag(tagBoxDiv, tagValue);
        searchWithRestTags(arrayFullTags);
    })
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