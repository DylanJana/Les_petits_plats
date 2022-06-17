import { fetchRecipesJSON } from "../../api/getData.js";
import { recipes, addRecipeInDOM, addInDropdown } from "../../pages/app.js";
import { firstDropDown, dropDownList } from "../dropdowns/dropdown-ingredients.js";
import { secondDropDown } from "../dropdowns/dropdown-devices.js";
import { thirdDropDown } from "../dropdowns/dropdown-instruments.js";
import{ itemListDisabledOnClick } from "../tags/tags.js";

let wrapper = document.querySelector('.wrapper');
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
            refreshWrapper(query, refreshWrapperReady);
        })
}

export const searchInRecipes = (query, recipesArticles) => {
    let counter = 0;
    for(let i = 0; i < recipesArticles.length; i++) {
        let currentRecipeBody = recipesArticles[i].querySelector('.card__recipe__body');
        if(!(currentRecipeBody.textContent.toLowerCase().includes(query.toLowerCase()))) {
            recipesArticles[i].style.display ="none";
            recipesArticles[i].classList.remove("avaible__recipe");
            counter++
        } 
        else {
            recipesArticles[i].removeAttribute("style");
            recipesArticles[i].classList.add("avaible__recipe");
            wrapperContainer.removeAttribute("style");
        }
    }
    checkWrapper(counter, recipesArticles);
    itemsInDropDown();
}

export const itemsInDropDown = () => {
    let avaiblesRecipes = document.querySelectorAll('.avaible__recipe');
    let avaiblesIngredients = [];
    dropDownList.innerHTML = '';
    for(let i = 0; i < avaiblesRecipes.length; i++) {
        let currentRecipeIngredients = avaiblesRecipes[i].querySelectorAll('.recipe__list li span');
        for(let j = 0; j < currentRecipeIngredients.length; j++ ) {
            let currentIngredient = currentRecipeIngredients[j].textContent;
            avaiblesIngredients.push(currentIngredient);
        }
    }

    for(let i = 0 ; i < avaiblesIngredients.length; i++) {
        console.log(avaiblesIngredients[i])
        for(let j = 0; j < firstDropDown.length; j++) {
            if(avaiblesIngredients[i].toLowerCase().trim() === firstDropDown[j].toLowerCase()) {
                let liItemIngredient = document.createElement('li');
                liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
                liItemIngredient.innerHTML = `
                    <a href="javascript:void(0);" class="list__item" onclick="findTagValueClick(this.innerText)"> ${firstDropDown[j][0].toUpperCase() + firstDropDown[j].slice(1)}</a>
                `
                    dropDownList.appendChild(liItemIngredient);
            }
        }
    }

    itemListDisabledOnClick();
    console.log("Array ingredients ", avaiblesIngredients);
    console.log("First Drop Down ", firstDropDown);
    console.log("Second Drop Down ", secondDropDown);
    console.log("Third Drop Down ", thirdDropDown);
}

itemsInDropDown
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