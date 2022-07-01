
import {firstDropDown} from "../dropdowns/dropdown-ingredients.js";
import {secondDropDown} from "../dropdowns/dropdown-devices.js";
import {thirdDropDown} from "../dropdowns/dropdown-instruments.js";
import { searchByTags, ingredientsAvailablesArray, displayUnavaiblesRecipes } from "../search/tag-search.js";
import { refreshAfterTagDelete} from "../tags/tag-delete.js";

export const createTagTemplate = (tagValue) => {
    let tagBoxContainer = document.querySelector('.box__tag__container');
    let tagBoxDiv = document.createElement('div');
    tagBoxDiv.classList.add('column', 'col-sm-3', 'column__tag');
    tagBoxContainer.appendChild(tagBoxDiv);
    let tagBox = `
        <div class="box__tag__content flex align-items--start justify-content--space-between">
            <p class="paragraph">${tagValue}</p>
            <span class="far fa-times-circle"></span>
        </div>
    `
    tagBoxDiv.innerHTML = tagBox;
    searchByTags(tagValue, tagBoxDiv);
}

export const createTagTiers = ()  => {
    let tagsTiers = document.querySelectorAll('.box__tag__content:not(.tag--quarts):not(.tag--fifth)');

    for(let i = 0; i < tagsTiers.length; i++) {
        tagsTiers[i].classList.add('tag--tiers');
    }
}

export const createTagQuarts = ()  => {
    let tagsQuarts = document.querySelectorAll('.box__tag__content:not(.tag--tiers):not(.tag--fifth)');

    for(let i = 0; i < tagsQuarts.length; i++) {
        tagsQuarts[i].classList.add('tag--quarts');
    }
}

export const createTagFifth = ()  => {
    let tagsFifths = document.querySelectorAll('.box__tag__content:not(.tag--tiers):not(.tag--quarts)');

    for(let i = 0; i < tagsFifths.length; i++) {
            tagsFifths[i].classList.add('tag--fifth');
    }
}

export function findTagValueClick(tagValue) {
    createTagTemplate(tagValue);

    if(firstDropDown.includes(tagValue.toLowerCase()) === true) {
        createTagTiers();
    } else if(secondDropDown.includes(tagValue.toLowerCase()) === true) {
        createTagQuarts();
    } else if(thirdDropDown.includes(tagValue.toLowerCase()) === true) {
        createTagFifth();
    }
};

export const deleteTag = (tagBoxDiv, unavaibleRecipes, containerBoxes) => {
    let closeTag = tagBoxDiv.querySelector('span');
    closeTag.addEventListener('click', (e) => {
        e.preventDefault();
        tagBoxDiv.classList.remove('column__tag');
        tagBoxDiv.style.display = "none";
        displayUnavaiblesRecipes(unavaibleRecipes, containerBoxes);
    })
}