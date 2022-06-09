import { fetchRecipesJSON } from "../api/getData.js";

const wrapperRecipes = document.querySelector(".wrapper");

export let recipes= [];
export let recipesIngredients = [];
export let firstDropDown = [];
export let secondDropDown = [];
export let thirdDropDown = [];
let searchBox = document.querySelector('#closeDropDown');
let searchBoxDevice = document.querySelector('#searchDeviceDropDown');
let searchBoxInstrument = document.querySelector('#searchInstrumentDropDown');
let ingredientsDropDown = document.querySelector('#ingredientsDropDown');
let deviceDropDown = document.querySelector('#deviceDropDown');
let instrumentDropDown = document.querySelector('#instrumentDropDown');

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
    let dropDownIngredients = document.querySelector('.btn.btn--tiers.dropdown-toggle');
    let dropDown = document.querySelector('.dropdown-menu');
    
    dropDownIngredients.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.style.display="block";
        dropDown.style.display= "block";
        ingredientsDropDown.style.display = "none";
        dropDownIngredients.classList.add('btn--dropdown');
    })

    let dropDownDevice = document.querySelector('.btn.btn--quarts.dropdown-toggle');
    let listDevice = document.querySelector('.dropdown--quarts');
    dropDownDevice.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxDevice.style.display="block";
        deviceDropDown.style.display="none";
        listDevice.style.display = "block";
        dropDownDevice.classList.add('btn--dropdown');
    })

    let dropDownInstrument = document.querySelector('.btn.btn--fifth.dropdown-toggle');
    let listInstrument = document.querySelector('.dropdown--fifth');
    dropDownInstrument.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxInstrument.style.display="block";
        instrumentDropDown.style.display="none";
        listInstrument.style.display = "block";
        dropDownInstrument.classList.add('btn--dropdown');
    })

    addIngredientInDropDown(recipeData);
    addDeviceInDropDown(recipeData);
    addInstrumentInDropDown(recipeData);
}

const addIngredientInDropDown = (recipeData) => {
    let dropDownList = document.querySelector('.dropdown--tiers ul');
    for(let i = 0; i < recipeData.length; i++) {
        let arrayIngredient = recipeData[i].ingredients;
        for(let j = 0; j < arrayIngredient.length; j++ ) {
            if(firstDropDown.indexOf(arrayIngredient[j].ingredient) < 0) {
                firstDropDown.push(arrayIngredient[j].ingredient);
            }
        }
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

const addDeviceInDropDown = (recipeData) => {
    let dropDownList = document.querySelector('.dropdown--quarts ul');
    let applianceArray = [];
    for(let i = 0; i < recipeData.length; i++) {
        let applianceItem = recipeData[i].appliance;
        applianceArray.push(applianceItem);
        for(let j = 0; j < applianceArray.length; j++ ) {
            if(secondDropDown.indexOf(applianceArray[j]) < 0) {
                secondDropDown.push(applianceArray[j]);
            }
        }
    }

    for(let i = 0; i < secondDropDown.length; i++) {
        let liItemIngredient = document.createElement('li');
        liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
        liItemIngredient.innerHTML = `
            <a href="javascript:void(0);"> ${secondDropDown[i]}</a>
        `
            dropDownList.appendChild(liItemIngredient);
    }
}

const addInstrumentInDropDown = (recipeData) => {
    let dropDownList = document.querySelector('.dropdown--fifth ul');
    for(let i = 0; i < recipeData.length; i++) {
        let arrayInstrument = recipeData[i].ustensils;
        for(let j = 0; j < arrayInstrument.length; j++ ) {
            if(thirdDropDown.indexOf(arrayInstrument[j]) < 0) {
                thirdDropDown.push(arrayInstrument[j]);
            }
        }
    }
    for(let i = 0; i < thirdDropDown.length; i++) {
        let liItemIngredient = document.createElement('li');
        liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
        liItemIngredient.innerHTML = `
            <a href="javascript:void(0);"> ${thirdDropDown[i]}</a>
        `
            dropDownList.appendChild(liItemIngredient);
    }
}

window.onclick = function(event) {
    if (!event.target.matches('.btn--dropdown') && !event.target.matches('#searchDropdown')) {
        let dropDownIngredients = document.querySelector('.btn.btn--tiers');
        let dropDown = document.querySelector('.dropdown-menu');
        let dropDownDevice = document.querySelector('.btn.btn--quarts');
        let listDevice = document.querySelector('.dropdown--quarts');
        let dropDownInstrument = document.querySelector('.btn.btn--fifth');
        let listInstrument = document.querySelector('.dropdown--fifth');
        searchBox.style.display ="none";
        ingredientsDropDown.style.display = "inline-flex";
        dropDownIngredients.classList.remove('btn--dropdown');
        dropDown.style.display="none";
        dropDownDevice.classList.remove('btn--dropdown');
        listDevice.style.display="none";
        searchBoxDevice.style.display ="none";
        deviceDropDown.style.display = "inline-flex";
        dropDownInstrument.classList.remove('btn--dropdown');
        listInstrument.style.display="none";
        searchBoxInstrument.style.display ="none";
        instrumentDropDown.style.display = "inline-flex";
    } else if(event.target.matches('.btn--tiers')) {
        let dropDownDevice = document.querySelector('.btn.btn--quarts');
        let listDevice = document.querySelector('.dropdown--quarts');
        let dropDownInstrument = document.querySelector('.btn.btn--fifth');
        let listInstrument = document.querySelector('.dropdown--fifth');
        dropDownDevice.classList.remove('btn--dropdown');
        listDevice.style.display="none";
        searchBoxDevice.style.display ="none";
        deviceDropDown.style.display = "inline-flex";
        dropDownInstrument.classList.remove('btn--dropdown');
        listInstrument.style.display="none";
        searchBoxInstrument.style.display ="none";
        instrumentDropDown.style.display = "inline-flex";
    } else if(event.target.matches('.btn--quarts')) {
        let dropDownIngredients = document.querySelector('.btn.btn--tiers');
        let dropDown = document.querySelector('.dropdown-menu');
        let dropDownInstrument = document.querySelector('.btn.btn--fifth');
        let listInstrument = document.querySelector('.dropdown--fifth');
        dropDownInstrument.classList.remove('btn--dropdown');
        searchBox.style.display ="none";
        ingredientsDropDown.style.display = "inline-flex";
        dropDownIngredients.classList.remove('btn--dropdown');
        dropDown.style.display="none";
        listInstrument.style.display="none";
        searchBoxInstrument.style.display ="none";
        instrumentDropDown.style.display = "inline-flex";
    } else if(event.target.matches('.btn--fifth')) {
        let dropDownIngredients = document.querySelector('.btn.btn--tiers');
        let dropDown = document.querySelector('.dropdown-menu');
        let dropDownDevice = document.querySelector('.btn.btn--quarts');
        let listDevice = document.querySelector('.dropdown--quarts');
        searchBox.style.display ="none";
        ingredientsDropDown.style.display = "inline-flex";
        dropDownIngredients.classList.remove('btn--dropdown');
        dropDown.style.display="none";
        dropDownDevice.classList.remove('btn--dropdown');
        listDevice.style.display="none";
        searchBoxDevice.style.display ="none";
        deviceDropDown.style.display = "inline-flex";
    }
}