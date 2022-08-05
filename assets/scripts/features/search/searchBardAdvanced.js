import { createLinesInDDAppliances, createLinesInDDIngredients, createLinesInDDUstensils } from '../dropdowns/dropdowns.js';
import { arrayTagsIngredients, arrayTagsAppliances, arrayTagsUstensils } from '../tags/createTags.js';

/*** Get input for each dropdown ***/
let inputIngredientsDD = document.querySelector('#searchIngredientsDropDown input');
let inputAppliancesDD = document.querySelector('#searchDeviceDropDown input');
let inputUstensilsDD = document.querySelector('#searchInstrumentDropDown input');

/*** Search Bar DropDown Ingredients ***/
// This function search ingredient in ingredients dropdown menu.
export const inputIngredientsSearch = (arrayIngredientsAvailables) => {
    let refreshDDIngredients = [];
    inputIngredientsDD.addEventListener('keyup', (e) => {
        let query = e.target.value.toLowerCase();

        if(query.length >= 3 ) {
            // If my query contains more than three or three character this function is run
            searchIngredientsMoreThreeChar(query, arrayIngredientsAvailables, refreshDDIngredients);
        }
        refreshDDIngredients = [];
    })

    inputIngredientsDD.addEventListener('keyup', (e) => {
        // If my query contains less than three character this function is run
        searchIngredientsLessThreeChar(e, arrayIngredientsAvailables);
    })
}

const searchIngredientsMoreThreeChar = (query, arrayIngredientsAvailables, refreshDDIngredients) => {
    for(let i = 0; i < arrayIngredientsAvailables.length; i++) {
        if(arrayIngredientsAvailables[i].toLowerCase().includes(query)) {
            if(refreshDDIngredients.indexOf(arrayIngredientsAvailables[i]) < 0 && !arrayTagsIngredients.includes(arrayIngredientsAvailables[i])) {
                refreshDDIngredients.push(arrayIngredientsAvailables[i]);
            }
        }
    }
    createLinesInDDIngredients(refreshDDIngredients);
}

const searchIngredientsLessThreeChar = (e, arrayIngredientsAvailables) => {

    let query = e.target.value.toLowerCase();
        if(query.length < 3 && e.keyCode === 8) {
            createLinesInDDIngredients(arrayIngredientsAvailables);
        }
}

/*** Search Bar DropDown Appliances ***/
export const inputAppliancesSearch = (arrayAppliancesAvailables) => {
    let refreshDDAppliances = [];
    inputAppliancesDD.addEventListener('keyup', (e) => {
        let query = e.target.value.toLowerCase();

        if(query.length >= 3 ) {
            // If my query contains more than three or three character this function is run
            searchAppliancesMoreThreeChar(query, arrayAppliancesAvailables, refreshDDAppliances);
        }
        refreshDDAppliances = [];
    })

    inputAppliancesDD.addEventListener('keyup', (e) => {
        // If my query contains less than three character this function is run
        searchAppliancesLessThreeChar(e, arrayAppliancesAvailables);
    })
}

const searchAppliancesMoreThreeChar = (query, arrayAppliancesAvailables, refreshDDAppliances) => {
    for(let i = 0; i < arrayAppliancesAvailables.length; i++) {
        if(arrayAppliancesAvailables[i].toLowerCase().includes(query) && !arrayTagsAppliances.includes(arrayAppliancesAvailables[i])) {
            if(refreshDDAppliances.indexOf(arrayAppliancesAvailables[i]) < 0) {
                refreshDDAppliances.push(arrayAppliancesAvailables[i]);
            }
        }
    }
    createLinesInDDAppliances(refreshDDAppliances);
}

const searchAppliancesLessThreeChar = (e, arrayAppliancesAvailables) => {
    let query = e.target.value.toLowerCase();
        if(query.length < 3 && e.keyCode === 8) {
            createLinesInDDAppliances(arrayAppliancesAvailables);
        }
}

/*** Search Bar DropDown Ustensils ***/
export const inputUstensilsSearch = (arrayUstensilsAvailables) => {
    let refreshDDUstensils = [];
    inputUstensilsDD.addEventListener('keyup', (e) => {
        let query = e.target.value.toLowerCase();

        if(query.length >= 3 ) {
            // If my query contains less than three character this function is run
            searchUstensilsMoreThreeChar(query, arrayUstensilsAvailables, refreshDDUstensils);
        }
        refreshDDUstensils = [];
    })

    inputUstensilsDD.addEventListener('keyup', (e) => {
        searchUstensilsLessThreeChar(e, arrayUstensilsAvailables);
    })
}

const searchUstensilsMoreThreeChar = (query, arrayUstensilsAvailables, refreshDDUstensils) => {
    for(let i = 0; i < arrayUstensilsAvailables.length; i++) {
        if(arrayUstensilsAvailables[i].toLowerCase().includes(query) && !arrayTagsUstensils.includes(arrayUstensilsAvailables[i])) {
            if(refreshDDUstensils.indexOf(arrayUstensilsAvailables[i]) < 0) {
                refreshDDUstensils.push(arrayUstensilsAvailables[i]);
            }
        }
    }
    createLinesInDDUstensils(refreshDDUstensils);
}

const searchUstensilsLessThreeChar = (e, arrayUstensilsAvailables) => {
    let query = e.target.value.toLowerCase();
        if(query.length < 3 && e.keyCode === 8) {
            createLinesInDDUstensils(arrayUstensilsAvailables);
        }
}