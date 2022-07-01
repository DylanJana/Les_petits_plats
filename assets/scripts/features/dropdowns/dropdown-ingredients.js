import { addLineInDropDown } from "../../pages/app.js";

export let searchBox = document.querySelector('#closeDropDown');
export let ingredientsDropDown = document.querySelector('#ingredientsDropDown');
export let firstDropDown = [];
export let dropDownList = document.querySelector('.dropdown--tiers ul');

export const addIngredientInDropDown = (recipeData) => {
    dropDownList.innerHTML = '';
    for(let i = 0; i < recipeData.length; i++) {
        let listIngredient = recipeData[i].ingredients;
        for(let j = 0; j < listIngredient.length; j++ ) {
            let ingredient = listIngredient[j].ingredient.toLowerCase();
            if((ingredient === 'crème fraiche') || (ingredient === 'crême fraîche')) {
                ingredient = "crème fraîche";
            }
            
            if(firstDropDown.indexOf(ingredient) < 0) {
                firstDropDown.push(ingredient);
            }
        }
    }
    for(let i = 0; i < firstDropDown.length; i++) {
        addLineInDropDown(dropDownList ,firstDropDown[i]);
    }
}

export const displayDropDownIngredient = () => {
    let dropDownIngredients = document.querySelector('.btn.btn--tiers.dropdown-toggle');
    let dropDown = document.querySelector('.dropdown-menu');
    
    dropDownIngredients.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.style.display="block";
        dropDown.style.display= "block";
        ingredientsDropDown.style.display = "none";
        dropDownIngredients.classList.add('btn--dropdown');
    })
}

export const closeDropDownIngredient = () => {
    let dropDownIngredients = document.querySelector('.btn.btn--tiers');
    let dropDown = document.querySelector('.dropdown-menu');
    searchBox.style.display ="none";
    ingredientsDropDown.style.display = "inline-flex";
    dropDownIngredients.classList.remove('btn--dropdown');
    dropDown.style.display="none";
}