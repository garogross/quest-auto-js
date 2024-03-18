import {bodyTypes} from "./constants.js";

// filter cars by body type from home page
export const checkIsBodyTypeFiltered = (clb) => {
    const {href} = window.location
    if(href.includes('bodyType')) {
        const curBodyType = bodyTypes.find(item => href.includes(item))
        if(curBodyType) {
            clb(curBodyType)
        }
    }
}