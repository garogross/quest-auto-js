import {getCars} from "./getCars.js";
import {searchCarsUrl} from "./api.js";


export const search = () => {
    const searchInp = document.querySelector('#brand-search')
    const searchBtn = document.querySelector('.navbar__searchBtn')

    searchBtn.addEventListener('click',() => {
        const filter = [{key: 'make',value: searchInp.value}]
        getCars(false,filter,searchCarsUrl)
    })
}