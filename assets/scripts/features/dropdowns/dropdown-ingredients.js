export let searchBox = document.querySelector('#closeDropDown');
export let ingredientsDropDown = document.querySelector('#ingredientsDropDown');
export let firstDropDown = [];
export let dropDownList = document.querySelector('.dropdown--tiers ul');
console.log(dropDownList)

export const addIngredientInDropDown = (recipeData) => {
    dropDownList.innerHTML = '';
    for(let i = 0; i < recipeData.length; i++) {
        let arrayIngredient = recipeData[i].ingredients;
        for(let j = 0; j < arrayIngredient.length; j++ ) {
            let ingredient = arrayIngredient[j].ingredient.toLowerCase();
            if(firstDropDown.indexOf(ingredient) < 0) {
                firstDropDown.push(ingredient);
            }
        }
    }
    for(let i = 0; i < firstDropDown.length; i++) {
        let liItemIngredient = document.createElement('li');
        liItemIngredient.classList.add('col-md-4', 'col-12', 'mb--xxs');
        liItemIngredient.innerHTML = `
            <a href="javascript:void(0);" class="list__item" onclick="findTagValueClick(this.innerText)"> ${firstDropDown[i][0].toUpperCase() + firstDropDown[i].slice(1)}</a>
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