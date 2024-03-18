import {proxy} from "./api.js";
import {toCapitalize} from "./toCapitalize.js";
import {getBasketFromLocStore} from "./basket.js";


export const openDetailsModal = (data) => {
    const detailsLink = document.querySelectorAll('.carsList__itemViewBtn')

    const onOpen = (e) => {
        e.preventDefault()
        // find opened car data by "data-id" attribute
        const curItem = data.find(item => item._id === e.target.dataset.id)
        if (!curItem) return;

        // selectors
        const viewDetailsModal = document.querySelector('#viewDetailsModal')
        const carMakeText = document.querySelector('#carMakeText')
        const carImg = document.querySelector('#carImg')
        const carPriceText = document.querySelector('#carPriceText')
        const carDescriptionText = document.querySelector('#carDescriptionText')
        const carFeaturesText = document.querySelector('#carFeaturesText')
        const addToCardBtn = viewDetailsModal.querySelector('.addToBasketBtn')
        const {make, model, price, image, description,features,_id} = curItem

        const basket = getBasketFromLocStore()


        // show car info
        carMakeText.innerHTML = `${toCapitalize(make.name)} ${toCapitalize(model.name)}`
        carImg.src = `${proxy}/api/${image}`
        carPriceText.innerHTML = `${price} $`
        carDescriptionText.innerHTML = description

        // update add to card button
        addToCardBtn.dataset.id = _id
        const isReserved = basket.find(item => item._id === _id)
        addToCardBtn.innerText = `${isReserved ? 'Added' : "Add"} To Basket`
        const classAction = isReserved ? 'add' : 'remove'
        addToCardBtn.classList[classAction]('mainBtn_reserved')

        if(features?.length) {
            carFeaturesText.innerHTML = features.reduce((acc,cur) => {
                acc += `<span><strong>${cur[0]}</strong>: ${cur[1]}</span>`
                return acc
            },"")
        }

        // show modal
        viewDetailsModal.style.display = 'block'
    }
    // set click event on "View Details" links
    detailsLink.forEach(item => {
        item.addEventListener('click', onOpen)
    })
}

export const closeDetailsModal = () => {
    const detailsCloseButton = document.querySelector('.detailsCloseButton')

    detailsCloseButton.addEventListener('click', () => {
        const viewDetailsModal = document.querySelector('#viewDetailsModal')
        viewDetailsModal.style.display = 'none'
    })
}