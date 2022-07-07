import { fetchRecipesJSON } from "../api/getData.js";
/// DropDowns
import { createLinesInDDIngredients, createLinesInDDAppliances, createLinesInDDUstensils } from "../features/dropdowns/dropdowns.js";

export let arrayIngredients = [];
export let arrayAppliances = [];
export let arrayUstensils = [];
let wrapperRecipes = document.querySelector(".wrapper");

export const dispatchRecipes = () => {
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
            console.log("recette ---------------------- ", data.recipes[i])
        }
        createLinesInDDIngredients(arrayIngredients);
        createLinesInDDAppliances(arrayAppliances);
        createLinesInDDUstensils(arrayUstensils);
    })
}

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
    let recipesIngredients = recipe["ingredients"];
    //itemsArray.push(articleRecipe)
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
            let currentList = list[j];
            currentList.appendChild(createLi);
        }
    }
}

export const dispatchIngredients = (ingredientsInRecipe) => {
    for(let i = 0; i < ingredientsInRecipe.length; i++) {
        let ingredientInRecipe = ingredientsInRecipe[i].ingredient;
        if(arrayIngredients.indexOf(ingredientInRecipe) < 0) {
            arrayIngredients.push(ingredientInRecipe);
        }
    }
}

export const dispatchAppareils = (appareilInRecipe) => {
    if(arrayAppliances.indexOf(appareilInRecipe) < 0) {
        arrayAppliances.push(appareilInRecipe);
    }
}

export const dispatchUstensiles = (ustensilesInRecipe) => {
    for(let i = 0; i < ustensilesInRecipe.length; i++) {
        let ustensileInRecipe = ustensilesInRecipe[i];
        if(arrayUstensils.indexOf(ustensileInRecipe) < 0) {
            arrayUstensils.push(ustensileInRecipe);
        }
    }
}
