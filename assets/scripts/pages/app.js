import { fetchRecipesJSON } from "../api/getData.js";
import { firstDropDown, addIngredientInDropDown, displayDropDownIngredient, closeDropDownIngredient, searchBox, ingredientsDropDown } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown, searchBoxDevice, deviceDropDown, addDeviceInDropDown, displayDropDownDevice, closeDropDownDevice } from "../dropdowns/dropdown-devices.js";
import { searchBoxInstrument, instrumentDropDown, addInstrumentInDropDown, displayDropDownInstrument, closeDropDownInstrument } from "../dropdowns/dropdown-instruments.js";

const wrapperRecipes = document.querySelector(".wrapper");

export let recipes= [];
export let recipesIngredients = [];

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
    addRecipeIngredientsInDOM(recipesIngredients);
}



const addRecipeIngredientsInDOM = (recipesIngredients) => {
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