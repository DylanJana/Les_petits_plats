export let searchBoxDevice = document.querySelector('#searchDeviceDropDown');
export let deviceDropDown = document.querySelector('#deviceDropDown');
export let secondDropDown = [];

export const addDeviceInDropDown = (recipeData) => {
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
            <a href="javascript:void(0);" class="list__item" onclick="findTagValueClick(this.innerText)"> ${secondDropDown[i]}</a>
        `
            dropDownList.appendChild(liItemIngredient);
    }
}

export const displayDropDownDevice = () => {
    let dropDownDevice = document.querySelector('.btn.btn--quarts.dropdown-toggle');
    let listDevice = document.querySelector('.dropdown--quarts');
    dropDownDevice.addEventListener('click', (e) => {
        e.preventDefault();
        searchBoxDevice.style.display="block";
        deviceDropDown.style.display="none";
        listDevice.style.display = "block";
        dropDownDevice.classList.add('btn--dropdown');
    })
}

export const closeDropDownDevice = () => {
    let dropDownDevice = document.querySelector('.btn.btn--quarts');
    let listDevice = document.querySelector('.dropdown--quarts');
    dropDownDevice.classList.remove('btn--dropdown');
        listDevice.style.display="none";
        searchBoxDevice.style.display ="none";
        deviceDropDown.style.display = "inline-flex";
}