import { fetchRecipesJSON } from "../api/getData.js";

const wrapperRecipes = document.querySelector(".wrapper");

export let recipes= [];
export let recipesIngredients = [];
export let firstDropDown = [];

fetchRecipesJSON()
    .then(data =>{
        for(let i = 0; i < data.recipes.length; i++){
            recipes[i] = data.recipes[i];
            addRecipeInDOM(recipes[i]);
        }
        addIngredientsInDropdown(data.recipes);
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

const addIngredientsInDropdown = (listIngredients) => {
    let dropDownIngredients = document.querySelector('.btn.btn--tiers');
    let dropDown = document.querySelector('.btn.btn--tiers + .dropdown-menu');
    let dropDownList = document.querySelector('ul');
    
    dropDownIngredients.addEventListener('click', (e) => {
        e.preventDefault();
        dropDownIngredients.innerHTML = `
        <div class="flex align-items--center justify-content--space-between dropdown__search-box">
            <input type="text" name="search" id="searchDropdown" placeholder="Rechercher un ingrédient">
            <span class="fas fa-chevron-up"></span>
        </div>
        `;
        dropDownIngredients.style.width= "488px";
        dropDownIngredients.style.borderRadius = "4px 4px 0 0";
        dropDown.style.display= "block";
    })
    for(let i = 0; i < listIngredients.length; i++) {
        let arrayIngredient = listIngredients[i].ingredients;
        for(let j = 0; j < arrayIngredient.length; j++ ) {
            if(firstDropDown.indexOf(arrayIngredient[j].ingredient) < 0) {
                firstDropDown.push(arrayIngredient[j].ingredient);
            }
        }
        console.log(firstDropDown)
    }
    for(let i = 0; i < firstDropDown.length; i++) {
        let liItemIngredient = document.createElement('li');
        liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
        liItemIngredient.innerHTML = `
            <a href="javascript:void(0);"> ${firstDropDown[i]}</a>
        `
            dropDownList.appendChild(liItemIngredient);
    }
}