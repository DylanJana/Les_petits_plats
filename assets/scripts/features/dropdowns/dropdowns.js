import { arrayTagsAppliances, arrayTagsIngredients, arrayTagsUstensils } from "../tags/tagsNew.js";

let searchBox = document.querySelector('#searchIngredientsDropDown');
let ingredientsDropDown = document.querySelector('#ingredientsDropDown');
let searchBoxAppliances = document.querySelector('#searchDeviceDropDown');
let appliancesDropDown = document.querySelector('#deviceDropDown');
let searchBoxUstensils = document.querySelector('#searchInstrumentDropDown');
let ustensilsDropDown = document.querySelector('#instrumentDropDown');

export const displayDropDownIngredient = () => {
    let dropDownIngredients = document.querySelector('.btn.btn--tiers');
    let dropDown = document.querySelector('.dropdown-menu');

    dropDownIngredients.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.style.display="block";
        dropDown.style.display= "block";
        ingredientsDropDown.style.display = "none";
        dropDownIngredients.classList.add('btn--dropdown');
    })

    document.addEventListener('click', (e) => {
        if(!e.target.matches('.btn--tiers') && !e.target.matches('#searchDropdown')) {
            searchBox.style.display ="none";
            ingredientsDropDown.style.display = "inline-flex";
            dropDownIngredients.classList.remove('btn--dropdown');
            dropDown.style.display="none";
        }
    })
}

export const createLinesInDDIngredients = (arrayIngredients) => {
    let dropDownIngredients = document.querySelector('.dropdown--tiers ul');
    dropDownIngredients.innerHTML = '';
    for(let i = 0; i < arrayIngredients.length; i++) {
        if(!arrayTagsIngredients.includes(arrayIngredients[i])) {
            addLineInDropDown(dropDownIngredients, arrayIngredients[i])
        }
    }
}


export const displayDropDownAppliances = () => {
    let dropDownAppliances = document.querySelector('.btn.btn--quarts.dropdown-toggle');
    let listAppliances = document.querySelector('.dropdown--quarts');
    dropDownAppliances.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxAppliances.style.display="block";
        appliancesDropDown.style.display="none";
        listAppliances.style.display = "block";
        dropDownAppliances.classList.add('btn--dropdown');
    })

    document.addEventListener('click', (e) => {
        if(!e.target.matches('.btn--quarts') && !e.target.matches('#searchDropdown')) {
            listAppliances.style.display="none";
            searchBoxAppliances.style.display ="none";
            appliancesDropDown.style.display = "inline-flex";
            dropDownAppliances.classList.remove('btn--dropdown');
        }
    })
}

export const createLinesInDDAppliances = (arrayAppliances) => {
    let dropDownAppliances = document.querySelector('.dropdown--quarts ul');
    dropDownAppliances.innerHTML = '';
    for(let i = 0; i < arrayAppliances.length; i++) {
        if(!arrayTagsAppliances.includes(arrayAppliances[i])) {
            addLineInDropDown(dropDownAppliances, arrayAppliances[i])
        }
    }
}

export const displayDropDownUstensils = () => {
    let dropDownUstensils = document.querySelector('.btn.btn--fifth.dropdown-toggle');
    let listUstensils = document.querySelector('.dropdown--fifth');
    dropDownUstensils.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxUstensils.style.display="block";
        ustensilsDropDown.style.display="none";
        listUstensils.style.display = "block";
        dropDownUstensils.classList.add('btn--dropdown');
    })

    document.addEventListener('click', (e) => {
        if(!e.target.matches('.btn--fifth') && !e.target.matches('#searchDropdown')) {
            listUstensils.style.display="none";
            searchBoxUstensils.style.display ="none";
            ustensilsDropDown.style.display = "inline-flex";
            dropDownUstensils.classList.remove('btn--dropdown');
        }
    })
}

export const createLinesInDDUstensils = (arrayUstensils) => {
    let dropDownUstensils = document.querySelector('.dropdown--fifth ul');
    dropDownUstensils.innerHTML = '';
    for(let i = 0; i < arrayUstensils.length; i++) {
        if(!arrayTagsUstensils.includes(arrayUstensils[i])) {
            addLineInDropDown(dropDownUstensils, arrayUstensils[i])
        }
    }
}

export const addLineInDropDown = (dropDownList, lineItem) => {
    let liItemIngredient = document.createElement('li');
    liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
    liItemIngredient.innerHTML = `
        <a href="javascript:void(0);" class="list__item" onclick="findTagValueClick(this.innerText)"> ${lineItem}</a>
    `
        dropDownList.appendChild(liItemIngredient);
}

export const removeLineInDropDown = (dropDownItems, lineItem) => {
    for(let i = 0; i < dropDownItems.length; i++) {
        if(dropDownItems[i].innerText.trim() === lineItem) {
            dropDownItems[i].style.display ="none";
        }
    }
}