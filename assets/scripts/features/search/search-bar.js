import { fetchRecipesJSON } from "../../api/getData.js";
import { itemsArray, recipes, addRecipeInDOM, addInDropdown } from "../../pages/app.js";

export const onSearch = (recipesArticles) => {
    let searchBar = document.querySelector("#search");

        searchBar.addEventListener('keyup', (e) => {
            const query = e.target.value;
            
            if(query.length >= 3) {
                findRecipeTitle(query, recipesArticles);
            } else if(query.length < 3) {
                cleanWrapper();
            }
        })
}

export const findRecipeTitle = (query, recipesArticles) => {
    for(let i = 0; i < recipesArticles.length; i++) {
        let titleRecipe = recipesArticles[i].querySelector('.card__recipe__body div p');
        if(!(titleRecipe.textContent.toLowerCase().includes(query.toLowerCase()))) {
            recipesArticles[i].remove();
        }
    }
    checkWrapper();
}

export const checkWrapper = () => {
    let checkWrapper = document.querySelectorAll('.card__recipe').length;
    let wrapper = document.querySelector('.wrapper');
    if( checkWrapper === 0) {
        let messageNoRecipes = `
        <div class="flex justify-content--center align-items--center w--100">
            <div class="t--box-a">
                <p class="paragraph"> Aucune recette ne correspond à votre critère... Vous pouvez chercher " tarte aux pommes", "poisson", etc... </p>
            </div>
        </div>
        `;
        wrapper.innerHTML = messageNoRecipes;
    }
}

export const cleanWrapper = () => {
    let wrapper = document.querySelector('.wrapper');
    wrapper.innerHTML = '';
    fetchRecipesJSON()
        .then(data =>{
            for(let i = 0; i < data.recipes.length; i++){
                recipes[i] = data.recipes[i];
                addRecipeInDOM(recipes[i]);
            }
            addInDropdown(data.recipes);
        })
}