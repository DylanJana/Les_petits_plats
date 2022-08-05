import { fetchRecipesJSON } from "../api/getData.js";
/// DropDowns
import { createLinesInDDIngredients, createLinesInDDAppliances, createLinesInDDUstensils } from "../features/dropdowns/dropdowns.js";
/*** Search Advanced ***/
import { inputIngredientsSearch, inputAppliancesSearch, inputUstensilsSearch } from "../features/search/searchBardAdvanced.js";

export let arrayIngredients = [];
export let arrayAppliances = [];
export let arrayUstensils = [];
export let arrayRecipes = [];
export let arrayRecipesUstensilsJSON = [];
export let arrayRecipesAppliancesInJSON = [];
export let wrapperRecipes = document.querySelector(".wrapper");

// This function show all recipes, all ingredients, appliances and ustensils
export const dispatchRecipes = () => {
    wrapperRecipes.innerHTML = '';
    fetchRecipesJSON()
    .then(data =>{
        for(let i = 0; i < data.recipes.length; i++){
            let ingredientsInRecipe = data.recipes[i].ingredients;
            let appareilInRecipe = data.recipes[i].appliance;
            let ustensilesInRecipe = data.recipes[i].ustensils;
            let recipeInEntire = data.recipes[i];

            dispatchRecipesInDom(recipeInEntire);
            dispatchIngredients(ingredientsInRecipe);
            dispatchAppareils(appareilInRecipe);
            dispatchUstensiles(ustensilesInRecipe);
            inputIngredientsSearch(arrayIngredients);
            inputAppliancesSearch(arrayAppliances);
            inputUstensilsSearch(arrayUstensils);
        }
        createLinesInDDIngredients(arrayIngredients);
        createLinesInDDAppliances(arrayAppliances);
        createLinesInDDUstensils(arrayUstensils);
    })
}

// This function create a template of a recipe
const dispatchRecipesInDom = (recipe) =>{
    let articleRecipe = document.createElement("article");
    articleRecipe.classList.add('column', 'card__recipe', 'col-lg-4', 'col-12', 'mb--sm',  'flex', 'flex--column', 'avaible__recipe');
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
    wrapperRecipes.appendChild(articleRecipe);
    arrayRecipes.push(articleRecipe);
    /* Get Only ustensils recipes */
    let recipesUstensils = recipe['ustensils'];
    arrayRecipesUstensilsJSON.push(recipesUstensils);
    let recipesIngredients = recipe["ingredients"];
    addRecipeIngredientsInCard(recipesIngredients);
    /* Get Only appliances recipes */
    let recipesAppliances = recipe['appliance'];
    arrayRecipesAppliancesInJSON.push(recipesAppliances);
}

// This function add every ingredient of a recipe in a template recipe
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
            let currentList = list[j];
            currentList.appendChild(createLi);
        }
    }
}

// This function add all ingredients once time in arrayIngredients
export const dispatchIngredients = (ingredientsInRecipe) => {
    for(let i = 0; i < ingredientsInRecipe.length; i++) {
        let ingredientInRecipe = ingredientsInRecipe[i].ingredient;
        if(arrayIngredients.indexOf(ingredientInRecipe) < 0) {
            arrayIngredients.push(ingredientInRecipe);
        }
    }
}

// This function add all appliances once time in arrayAppliances
export const dispatchAppareils = (appareilInRecipe) => {
    if(arrayAppliances.indexOf(appareilInRecipe) < 0) {
        arrayAppliances.push(appareilInRecipe);
    }
}

// This function add all ustensils once time in arrayUstensils
export const dispatchUstensiles = (ustensilesInRecipe) => {
    for(let i = 0; i < ustensilesInRecipe.length; i++) {
        let ustensileInRecipe = ustensilesInRecipe[i];
        if(arrayUstensils.indexOf(ustensileInRecipe) < 0) {
            arrayUstensils.push(ustensileInRecipe);
        }
    }
}