/*** Pages ***/
import { dispatchRecipes } from "../pages/dispatchRecipes.js";
/*** DropDowns ***/
import { displayDropDownIngredient, displayDropDownAppliances, displayDropDownUstensils } from "../features/dropdowns/dropdowns.js";
/*** SearchBar ***/
import { searchWordInRecipes } from "../features/search/searchBar.js";

const mainFunction = () => {
    dispatchRecipes();
    displayDropDownIngredient();
    displayDropDownAppliances();
    displayDropDownUstensils();
    /*** SearchBar ***/
    searchWordInRecipes();
}

mainFunction();