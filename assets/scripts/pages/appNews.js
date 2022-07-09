/*** Pages ***/
import { dispatchRecipes, arrayIngredients, arrayAppliances, arrayUstensils } from "../pages/dispatchRecipes.js";
/*** DropDowns ***/
import { displayDropDownIngredient, displayDropDownAppliances, displayDropDownUstensils } from "../features/dropdowns/dropdowns.js";
/*** SearchBar ***/
import { searchWordInRecipes } from "../features/search/searchBar.js";
/*** SearchBard Advanced ***/
import { inputIngredientsSearch, inputAppliancesSearch, inputUstensilsSearch } from "../features/search/searchBardAdvanced.js";

const mainFunction = () => {
    dispatchRecipes();
    displayDropDownIngredient();
    displayDropDownAppliances();
    displayDropDownUstensils();
    /*** SearchBar ***/
    searchWordInRecipes();
    /*** SearchBard Advanced ***/
    inputIngredientsSearch(arrayIngredients);
    inputAppliancesSearch(arrayAppliances);
    inputUstensilsSearch(arrayUstensils);

}

mainFunction();