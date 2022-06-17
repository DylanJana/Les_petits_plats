import { addLineInDropDown } from "../../pages/app.js";

export let searchBoxInstrument = document.querySelector('#searchInstrumentDropDown');
export let instrumentDropDown = document.querySelector('#instrumentDropDown');
export let thirdDropDown = [];

export const addInstrumentInDropDown = (recipeData) => {
    let dropDownList = document.querySelector('.dropdown--fifth ul');
    for(let i = 0; i < recipeData.length; i++) {
        let arrayInstrument = recipeData[i].ustensils;
        for(let j = 0; j < arrayInstrument.length; j++ ) {
            let instrument = arrayInstrument[j].toLowerCase();
            if(thirdDropDown.indexOf(instrument) < 0) {
                thirdDropDown.push(instrument);
            }
        }
    }
    for(let i = 0; i < thirdDropDown.length; i++) {
        addLineInDropDown(dropDownList ,thirdDropDown[i]);
    }
}

export const displayDropDownInstrument = () => {
    let dropDownInstrument = document.querySelector('.btn.btn--fifth.dropdown-toggle');
    let listInstrument = document.querySelector('.dropdown--fifth');
    dropDownInstrument.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxInstrument.style.display="block";
        instrumentDropDown.style.display="none";
        listInstrument.style.display = "block";
        dropDownInstrument.classList.add('btn--dropdown');
    })
}

export const closeDropDownInstrument = () => {
    let dropDownInstrument = document.querySelector('.btn.btn--fifth');
    let listInstrument = document.querySelector('.dropdown--fifth');
    dropDownInstrument.classList.remove('btn--dropdown');
    listInstrument.style.display="none";
    searchBoxInstrument.style.display ="none";
    instrumentDropDown.style.display = "inline-flex";
}