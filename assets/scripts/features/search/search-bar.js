import { fetchRecipesJSON } from "../../api/getData.js";
import { recipes, addRecipeInDOM, addInDropdown } from "../../pages/app.js";
import { itemsInDropDown } from "./tag-search.js";

export let wrapper = document.querySelector('.wrapper');
let wrapperContainer = document.createElement('div');
wrapperContainer.classList.add('flex', 'justify-content--center', 'align-items--center', 'w--100', 'empty-message');
let refreshWrapperReady;

export const onSearch = (recipesArticles) => {
    let searchBar = document.querySelector("#search");

        searchBar.addEventListener('keyup', (e) => {
            const query = e.target.value;
            
            if(query.length >= 3) {
                searchInRecipes(query, recipesArticles);
                refreshWrapperReady= false;
            }
            refreshWrapperIsReady(query, refreshWrapperReady);
        })
}

export const searchInRecipes = (query, recipesArticles) => {
    let counter = 0;
    let containerBoxes = document.querySelector('.box__tag__container');
    containerBoxes.innerHTML = '';
    for(let i = 0; i < recipesArticles.length; i++) {
        let currentRecipeBody = recipesArticles[i].querySelector('.card__recipe__body');
        if(!(currentRecipeBody.textContent.toLowerCase().includes(query.toLowerCase()))) {
            recipesArticles[i].style.display ="none";
            recipesArticles[i].classList.remove("avaible__recipe");
            counter++
        } 
        else {
            recipesArticles[i].removeAttribute("style");
            if(!recipesArticles[i].classList.contains("avaible__recipe")) {
                recipesArticles[i].classList.add("avaible__recipe");
            }
            wrapperContainer.removeAttribute("style");
        }
    }
    checkWrapper(counter, recipesArticles);
    itemsInDropDown();
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

export const refreshWrapperIsReady = (query) => {
    if((query.length < 3 && refreshWrapperReady === false)) {
        reloadWrapper()
    }
}

export const reloadWrapper = () => {
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
        refreshWrapperReady = true;
}