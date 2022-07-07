/*** Pages ***/
import { dispatchRecipes } from "../pages/dispatchRecipes.js";
/*** DropDowns ***/
import { displayDropDownIngredient, displayDropDownAppliances, displayDropDownUstensils } from "../features/dropdowns/dropdowns.js";

const mainFunction = () => {
    dispatchRecipes();
    displayDropDownIngredient();
    displayDropDownAppliances();
    displayDropDownUstensils();
}

mainFunction();