import {fetchRequest, getCarsUrl} from "./api.js";
import {renderCars} from "./renderCarsData.js";
import {checkIsBodyTypeFiltered} from "./checkIsBodyTypeFiltered.js";

export const getCars = async (getFromQuery,filters = [],url = getCarsUrl) => {
    const filterOptions = filters

    // filter body type by url query parameters
    const clb = (curBodyType) => filterOptions.push({key: 'bodyType',value: curBodyType})
    if(getFromQuery) checkIsBodyTypeFiltered(clb)

    // get query url from filters object
    const getUrlWithFiltersQuery = (url) => {
        const params =  filterOptions.reduce((acc,cur) => {
            acc += cur.value ? `${cur.key}=${cur.value}&` : ""
            return acc
        },"?")

        return `${url}${params}`
    }
    try {
        // request cars
        const {data} = await fetchRequest(getUrlWithFiltersQuery(url))

        renderCars(data)
    } catch (err) {
        console.error({err})
    }

}