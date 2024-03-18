import {fetchRequest, getOptionsUrl} from "./api.js";
import {renderFilters} from "./renderFilters.js";

export const getOptions = async () => {
    try {
        // request filter options
        const data = await fetchRequest(getOptionsUrl)
        // render options
        renderFilters(data)
    } catch (err) {
        console.error({err})
    }
}