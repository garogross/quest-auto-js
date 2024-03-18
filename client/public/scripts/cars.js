import {filterCarsData} from "./modules/filter.js";
import {getCars} from "./modules/getCars.js";
import {search} from "./modules/search.js";
import {closeReserveModal} from "./modules/reserveModal.js";
import {closeDetailsModal} from "./modules/detailsModal.js";
import {getOptions} from "./modules/getOptions.js";





window.addEventListener('DOMContentLoaded',() => {
    // get and render cars data
    getCars(true)
    // get filter options
    getOptions()
    // filter cars
    filterCarsData()
    // search car by make
    search()
    // close details modal
    closeDetailsModal()
})

