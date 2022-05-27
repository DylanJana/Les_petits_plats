import { fetchRecipesJSON } from "../api/getData.js";

const wrapperRecipes = document.querySelector(".wrapper");

export let recipes= [];

fetchRecipesJSON()
    .then(data =>{
        for(let i = 0; i < data.recipes.length; i++){
            recipes[i] = data.recipes[i];
            addRecipeInDOM(recipes[i]);
        }
    })

const addRecipeInDOM = (recipe) =>{
    const articleRecipe = document.createElement("article");
    articleRecipe.classList.add('column', 'card__recipe', 'col-lg-4', 'col-12', 'mb--sm',  'flex', 'flex--column');
    wrapperRecipes.appendChild(articleRecipe);
    articleRecipe.innerHTML=  `
    <img src="assets/img/dessert.jpg">
    <div class="card__recipe__body">
        <div class="row--has-columns-md flex flex-wrap align-items--center mb--xs card__recipe__title">
            <p class="paragraph column col-sm-6 col-12">${recipe.name}</p>
            <span class="column col-sm-6 col-12"><i class="far fa-clock"></i>${recipe.time}min</span>
        </div>
        <div class="row--has-columns-md flex flex-wrap">
            <ul class="column col-sm-6 col-12 recipe__list">
                <li><span>Lait de coco:</span> 400ml</li>
                <li><span>Jus de citron:</span> 2</li>
                <li><span>Créme de coco:</span> 4 cuillères</li>
                <li><span>Sucre:</span> 20g</li>
                <li><span>Glaçons:</span> 2</li>
            </ul>
            <p class="paragraph recipe__desc column col-sm-6 col-12">${recipe.description}</p>
        </div>
    </div>`;
}