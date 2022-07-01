export const refreshAfterTagDelete = () => {
    let cardsRecipes = document.querySelectorAll('.card__recipe');
    let cardsRecipesArray = [];
    for(let i = 0; i < cardsRecipes.length; i++) {
        let cardRecipe = cardsRecipes[i];
        console.log("cardRecipe ", cardRecipe)
        if(!(cardRecipe.classList.contains('avaible__recipe'))) {
            cardsRecipesArray.push(cardRecipe);
        }
    }
    console.log("card recipes array ", cardsRecipesArray)
}