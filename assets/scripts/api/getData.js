export async function fetchRecipesJSON(){
    const response = await fetch("/data/recipes.json");
    const data = await response.json();
    return data;
}