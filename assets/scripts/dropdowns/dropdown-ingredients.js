export let searchBox = document.querySelector('#closeDropDown');
export let ingredientsDropDown = document.querySelector('#ingredientsDropDown');
export let firstDropDown = [];

export const addIngredientInDropDown = (recipeData) => {
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

export const displayDropDownIngredient = () => {
    let dropDownIngredients = document.querySelector('.btn.btn--tiers.dropdown-toggle');
    let dropDown = document.querySelector('.dropdown-menu');
    
    dropDownIngredients.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.style.display="block";
        dropDown.style.display= "block";
        ingredientsDropDown.style.display = "none";
        dropDownIngredients.classList.add('btn--dropdown');
    })
}

export const closeDropDownIngredient = () => {
    let dropDownIngredients = document.querySelector('.btn.btn--tiers');
    let dropDown = document.querySelector('.dropdown-menu');
    searchBox.style.display ="none";
    ingredientsDropDown.style.display = "inline-flex";
    dropDownIngredients.classList.remove('btn--dropdown');
    dropDown.style.display="none";
}