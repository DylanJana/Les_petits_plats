
import {firstDropDown} from "../dropdowns/dropdown-ingredients.js";
import {secondDropDown} from "../dropdowns/dropdown-devices.js";
import {thirdDropDown} from "../dropdowns/dropdown-instruments.js";

export const createTagTemplate = (tagValue) => {
    let tagBoxContainer = document.querySelector('.box__tag__container');
    let tagBoxDiv = document.createElement('div');
    tagBoxDiv.classList.add('column', 'col-sm-3');
    tagBoxContainer.appendChild(tagBoxDiv);
    let tagBox = `
        <div class="box__tag__content flex align-items--start justify-content--space-between">
            <p class="paragraph">${tagValue}</p>
            <span class="far fa-times-circle"></span>
        </div>
    `
    tagBoxDiv.innerHTML = tagBox;
    deleteTag(tagBoxDiv);
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
    createTagTemplate(tagValue)

    if(firstDropDown.includes(tagValue) === true) {
        createTagTiers();
    } else if(secondDropDown.includes(tagValue) === true) {
        createTagQuarts();
    } else if(thirdDropDown.includes(tagValue) === true) {
        createTagFifth();
    }
};

export const itemListDisabledOnClick = () => {
    let itemList = document.querySelectorAll('.list__item');

    for(let i = 0; i < itemList.length; i++) {
        itemList[i].addEventListener('click', (e) => {
            let itemSelected = e.target;
            itemSelected.classList.add('list__item__disabled');
        })
    }
}

export const deleteTag = (tagBoxDiv) => {
    let closeTag = tagBoxDiv.querySelector('span');
    closeTag.addEventListener('click', (e) => {
        e.preventDefault();
        let tagTextValue = tagBoxDiv.querySelector('p').innerText;
        tagBoxDiv.style.display = "none";
        reactivateItemDropDown(tagTextValue);
})
}

export const reactivateItemDropDown = (tagTextValue) => {
let allItems = document.querySelectorAll('.list__item__disabled');
for(let i = 0; i < allItems.length; i++) {
    if(allItems[i].textContent == (" " + tagTextValue)) {
        allItems[i].classList.remove('list__item__disabled')
    }
}
}
