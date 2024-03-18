import {proxy} from "./api.js"
import {openDetailsModal} from "./detailsModal.js";
import {toCapitalize} from "./toCapitalize.js";
import {addToBasket, getBasketFromLocStore} from "./basket.js";

export const renderCars = (data) => {

    const container = document.querySelector('#carListContainer')

    const basket = getBasketFromLocStore()

    if (!data.length) return container.innerHTML = "";
    const itemHtml = ({image, make, model, price,_id}) => {
        const isReserved = basket.find(item => item._id === _id)
        return (`
        <div class="carsList__item">
                    <img 
                        crossorigin="anonymous" 
                        src="${proxy}/api/${image}" 
                        alt={model} 
                        class="carsList__itemImg"
                    />
                    <h6 class="carsList__itemNameTxt">${toCapitalize(make.name)} ${toCapitalize(model.name)}</h6>
                    <p class='carsList__itemPriceTxt'>${price} $</p>
                    <div class="carsList__itemBottomBlock flexBetween">
                        <button class="mainBtn ${isReserved ? 'mainBtn_reserved' : ""} addToBasketBtn" data-id="${_id}">${isReserved ? 'Added' : "Add"} To Basket</button>
                        <button data-id="${_id}"
                                class="carsList__itemViewBtn"
                        >View Details</button>
                    </div>
                </div>
        `)
    }

    container.innerHTML = data.reduce((acc, cur) => {
        acc += itemHtml(cur)
        return acc;
    }, "")

    openDetailsModal(data)
    addToBasket(data)

}