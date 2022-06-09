import { fetchRecipesJSON } from "../api/getData.js";
import { firstDropDown, addIngredientInDropDown, displayDropDownIngredient, closeDropDownIngredient, searchBox, ingredientsDropDown } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown, searchBoxDevice, deviceDropDown, addDeviceInDropDown, displayDropDownDevice, closeDropDownDevice } from "../dropdowns/dropdown-devices.js";
import { thirdDropDown, searchBoxInstrument, instrumentDropDown, addInstrumentInDropDown, displayDropDownInstrument, closeDropDownInstrument } from "../dropdowns/dropdown-instruments.js";

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

const addRecipeInDOM = (recipe) =>{
    const articleRecipe = document.createElement("article");
    articleRecipe.classList.add('column', 'card__recipe', 'col-lg-4', 'col-12', 'mb--sm',  'flex', 'flex--column');
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
    addRecipeIngredientsInCard(recipesIngredients);
}



const addRecipeIngredientsInCard = (recipesIngredients) => {
    let list = document.querySelectorAll('.recipe__list');

    for(let i = 0; i < recipesIngredients.length; i++) {
        let createLi = document.createElement('li');
        if((recipesIngredients[i].unit !== undefined) && (recipesIngredients[i].quantity !== undefined)) {
            createLi.innerHTML = `
                <li><span>${recipesIngredients[i].ingredient} : </span>${recipesIngredients[i].quantity} ${recipesIngredients[i].unit}</li>
            `
        } else if(recipesIngredients[i].quantity !== undefined) {
            createLi.innerHTML = `
                <li><span>${recipesIngredients[i].ingredient} : </span>${recipesIngredients[i].quantity}</li>
            `
        }

        for(let j = 0; j < list.length; j++) {
            list[j].appendChild(createLi);
        }
    }
}

const addInDropdown = (recipeData) => {
    displayDropDownIngredient();
    displayDropDownDevice();
    displayDropDownInstrument();
    addIngredientInDropDown(recipeData);
    addDeviceInDropDown(recipeData);
    addInstrumentInDropDown(recipeData);
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

window.findValueClick = findValueClick;

export function findValueClick(filterValue) {
    let tagBoxContainer = document.querySelector('.box__tag__container');
    let tagBoxDiv = document.createElement('div');
    tagBoxDiv.classList.add('column', 'col-sm-2');
    tagBoxContainer.appendChild(tagBoxDiv);
    let tagBox = `
        <div class="box__tag__content flex align-items--start justify-content--space-between">
            <p class="paragraph">${filterValue}</p>
            <span class="far fa-times-circle"></span>
        </div>
    `
    tagBoxDiv.innerHTML = tagBox;
    if(firstDropDown.includes(filterValue) === true) {
        let tagsTiers = document.querySelectorAll('.box__tag__content:not(.tag--quarts):not(.tag--fifth)');

        for(let i = 0; i < tagsTiers.length; i++) {
            tagsTiers[i].classList.add('tag--tiers');
        }
    } else if(secondDropDown.includes(filterValue) === true) {
        let tagsQuarts = document.querySelectorAll('.box__tag__content:not(.tag--tiers):not(.tag--fifth)');

        for(let i = 0; i < tagsQuarts.length; i++) {
            tagsQuarts[i].classList.add('tag--quarts');
        }
    } else if(thirdDropDown.includes(filterValue) === true) {

        let tagsFifths = document.querySelectorAll('.box__tag__content:not(.tag--tiers):not(.tag--quarts)');

        for(let i = 0; i < tagsFifths.length; i++) {
                tagsFifths[i].classList.add('tag--fifth');
        }
    }
};