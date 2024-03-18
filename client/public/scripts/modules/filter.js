import {getCars} from "./getCars.js";


export const filterCarsData = () => {
    // selectors
    const filterForm = document.querySelector('#carFilterContainer')
    const options = document.querySelectorAll('.carsFilter__field')


    // filter on submit (on click "filter" button)
    filterForm.addEventListener('submit', (e) => {
        e.preventDefault()
        const filters = [...options].map(item => ({
            key: item.id.replace('-select',""),
            value: item.value
        }))

        // get filtered cars
        getCars(false,filters)
    })

    // reset filters
    filterForm.addEventListener('reset', (e) => {
        getCars(false, [])
    })



}