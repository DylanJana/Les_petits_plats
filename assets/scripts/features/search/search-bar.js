import { fetchRecipesJSON } from "../../api/getData.js";
import { recipes, addRecipeInDOM, addInDropdown } from "../../pages/app.js";
let wrapper = document.querySelector('.wrapper');
let wrapperContainer = document.createElement('div');
wrapperContainer.classList.add('flex', 'justify-content--center', 'align-items--center', 'w--100', 'empty-message');
let refreshWrapperReady;

export const onSearch = (recipesArticles) => {
    let searchBar = document.querySelector("#search");

        searchBar.addEventListener('keyup', (e) => {
            const query = e.target.value;
            
            if(query.length >= 3) {
                findRecipeTitle(query, recipesArticles);
                refreshWrapperReady= false;
            }
            refreshWrapper(query, refreshWrapperReady);
        })
}

export const findRecipeTitle = (query, recipesArticles) => {
    let counter = 0;
    for(let i = 0; i < recipesArticles.length; i++) {
        let titleRecipe = recipesArticles[i].querySelector('.card__recipe__body div p');
        if(!(titleRecipe.textContent.toLowerCase().includes(query.toLowerCase()))) {
            recipesArticles[i].style.display ="none";
            counter++
        } else {
            recipesArticles[i].removeAttribute("style");
            wrapperContainer.removeAttribute("style");
        }
    }
    checkWrapper(counter, recipesArticles);
}

export const checkWrapper = (counter, recipesArticles) => {
    if(counter === recipesArticles.length) {
        wrapperContainer.style.display = "block";
        let messageNoRecipes = `
        <div class="flex justify-content--center align-items--center w--100">
            <div class="t--box-a">
                <p class="paragraph"> Aucune recette ne correspond à votre critère... Vous pouvez chercher " tarte aux pommes", "poisson", etc... </p>
            </div>
        </div>
        `;
        wrapperContainer.innerHTML = messageNoRecipes;
        wrapper.appendChild(wrapperContainer);
    }
}

export const refreshWrapper = (query) => {
    if(query.length < 3 && refreshWrapperReady === false) {
        wrapper.innerHTML = '';
        fetchRecipesJSON()
        .then(data =>{
            for(let i = 0; i < data.recipes.length; i++){
                recipes[i] = data.recipes[i];
                addRecipeInDOM(recipes[i]);
            }
            addInDropdown(data.recipes);
        })
        refreshWrapperReady = true;
    }
}