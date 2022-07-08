/*import { fetchRecipesJSON } from "../api/getData.js";
import { addIngredientInDropDown, displayDropDownIngredient, closeDropDownIngredient } from "../features/dropdowns/dropdown-ingredients.js";
import { addDeviceInDropDown, displayDropDownDevice, closeDropDownDevice } from "../features/dropdowns/dropdown-devices.js";
import { addInstrumentInDropDown, displayDropDownInstrument, closeDropDownInstrument } from "../features/dropdowns/dropdown-instruments.js";
import{ findTagValueClick } from "../features/tags/tags.js";
import { onSearch } from "../features/search/search-bar.js";
import { dispacthRecipes } from "./dispatchRecipes.js";

const wrapperRecipes = document.querySelector(".wrapper");

export let recipes= [];
export let recipesIngredients = [];
export let itemsArray = [];

fetchRecipesJSON()
    .then(data =>{
        for(let i = 0; i < data.recipes.length; i++){
            recipes[i] = data.recipes[i];
            addRecipeInDOM(recipes[i]);
        }
        addInDropdown(data.recipes);
    })

export const addRecipeInDOM = (recipe) =>{
    const articleRecipe = document.createElement("article");
    articleRecipe.classList.add('column', 'card__recipe', 'col-lg-4', 'col-12', 'mb--sm',  'flex', 'flex--column', 'avaible__recipe');
    wrapperRecipes.appendChild(articleRecipe);
    articleRecipe.innerHTML=  `
    <img src="assets/img/cook.jpg">
    <div class="card__recipe__body">
        <div class="row--has-columns-md flex flex-wrap mb--xs card__recipe__title">
            <p class="paragraph column col-sm-6 col-12">${recipe.name}</p>
            <span class="column col-sm-6 col-12"><i class="far fa-clock"></i>${recipe.time}min</span>
        </div>
        <div class="row--has-columns-md flex flex-wrap">
            <ul class="column col-sm-6 col-12 recipe__list">
            </ul>
            <p class="paragraph recipe__desc column col-sm-6 col-12">${recipe.description}</p>
        </div>
    </div>`;
    recipesIngredients = recipe["ingredients"];
    itemsArray.push(articleRecipe)
    addRecipeIngredientsInCard(recipesIngredients);
}

const addRecipeIngredientsInCard = (recipesIngredients) => {
    let list = document.querySelectorAll('.recipe__list');

    for(let i = 0; i < recipesIngredients.length; i++) {
        let createLi = document.createElement('li');
        if((recipesIngredients[i].unit !== undefined) && (recipesIngredients[i].quantity !== undefined)) {
            createLi.innerHTML = `
                <span>${recipesIngredients[i].ingredient} </span>: ${recipesIngredients[i].quantity} ${recipesIngredients[i].unit}
            `
        } else if(recipesIngredients[i].quantity !== undefined) {
            createLi.innerHTML = `
                <span>${recipesIngredients[i].ingredient} </span>: ${recipesIngredients[i].quantity}
            `
        }

        for(let j = 0; j < list.length; j++) {
            list[j].appendChild(createLi);
        }
    }
}

export const addInDropdown = (recipeData) => {
    displayDropDownIngredient();
    displayDropDownDevice();
    displayDropDownInstrument();
    addIngredientInDropDown(recipeData);
    addDeviceInDropDown(recipeData);
    addInstrumentInDropDown(recipeData);
}

onSearch(itemsArray);

export const addLineInDropDown = (dropDownList, lineItem) => {
    let liItemIngredient = document.createElement('li');
    liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
    liItemIngredient.innerHTML = `
        <a href="javascript:void(0);" class="list__item" onclick="findTagValueClick(this.innerText)"> ${lineItem[0].toUpperCase() + lineItem.slice(1)}</a>
    `
        dropDownList.appendChild(liItemIngredient);
}
// Close dropdown on click on window
window.onclick = function(event) {
    if (!event.target.matches('.btn--dropdown') && !event.target.matches('#searchDropdown')) {
        closeDropDownIngredient();
        closeDropDownDevice();
        closeDropDownInstrument();
    } else if(event.target.matches('.btn--tiers')) {
        closeDropDownDevice();
        closeDropDownInstrument();
    } else if(event.target.matches('.btn--quarts')) {
        closeDropDownIngredient();
        closeDropDownInstrument();
    } else if(event.target.matches('.btn--fifth')) {
        closeDropDownIngredient();
        closeDropDownDevice();
    }
}

window.findTagValueClick = findTagValueClick;
*/