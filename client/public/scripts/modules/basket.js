import {proxy} from "./api.js";
import {toCapitalize} from "./toCapitalize.js";
import {openReserveModal} from "./reserveModal.js";

export const addToBasketBtnTexts = {
    added: "Added to basket",
    notAdded: "Add to basket",
}

export const getBasketFromLocStore = () => {
    const locStoreData = localStorage.getItem('basket')
    return locStoreData ? JSON.parse(locStoreData) : []
}

const saveToLocStore = (carData) => {
    const basketData = getBasketFromLocStore()

    const newData = [...basketData, carData]
    localStorage.setItem('basket', JSON.stringify(newData))
    showCount(newData)
}

export const addToBasket = (carData) => {
    const basketBtns = document.querySelectorAll('.addToBasketBtn')

    basketBtns
        .forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.classList.contains('mainBtn_reserved')) return;
                const curItem = Array.isArray(carData) ? carData.find(item => item._id === e.target.dataset.id) : carData
                const curBtns = document.querySelectorAll(`.addToBasketBtn[data-id="${e.target.dataset.id}"]`);


                curBtns.forEach(item => {
                    item.innerText = addToBasketBtnTexts.added
                    item.classList.add('mainBtn_reserved')
                })
                saveToLocStore(curItem)
            })
        })


}


export const showCount = (data) => {
    const basketCount = document.querySelector('.navbar__basketCountText')
    const basketData = data || getBasketFromLocStore()
    if (basketData.length) {
        basketCount.classList.remove('hidden')
        basketCount.innerText = basketData.length
    } else {
        basketCount.classList.add('hidden')
    }

}

export const toggleBasketModal = () => {
    const basketBtn = document.querySelector('.navbar__basketBtn')
    const basketModal = document.querySelector('.basketModal')
    basketBtn.addEventListener('click', () => {
        if (basketModal.classList.contains('hidden')) {
            const basket = getBasketFromLocStore()
            renderBasketModalContent(basket)
        }

        basketModal.classList.toggle('hidden')
    })
}

export const renderBasketModalContent = (data) => {
    const basketModal = document.querySelector('.basketModal__container')
    const emptyBlock = document.querySelector('.basketModal__emptyBlock')
    const reserveBtn = document.querySelector('.basketModal__reserveBtn')
    const totalPriceTxt = document.querySelector('#totalPrice')

    const html = data.length ?
        data.reduce((acc, {image, make, model, price, _id}) => {
            acc += ` <div class="basketModal__item" data-id="${_id}">
                        <img
                               crossorigin="anonymous" 
                                src="${proxy}/api/${image}" 
                                alt="car"
                                class="basketModal__img"
                        >
                        <div class="basketModal__info">
                            <h4 class="basketModal__carNameTxt">${toCapitalize(make.name)} ${toCapitalize(model.name)}</h4>
                            <h6 class="basketModal__priceTxt">${price} $</h6>
                            <button class="basketModal__deleteBtn" data-id="${_id}">Delete</button>
                        </div>
                    </div>`

            return acc
        }, "") : ""
    const totalPrice = data ? data.reduce((acc, cur) => {
        acc += cur.price
        return acc
    }, 0) : 0

    basketModal.innerHTML = html
    totalPriceTxt.innerText = `${totalPrice} $`
    const classAction = data.length ? 'add' : 'remove'
    if (data.length) deleteItemFromBasket()
    emptyBlock.classList[classAction]('hidden')
    reserveBtn.disabled = !data.length
}

export const closeBasketModal = () => {
    const basketBtn = document.querySelector('.navbar__basketBtn')

    window.addEventListener('click', (e) => {
        const basketModal = document.querySelector('.basketModal')

        if (
            !basketModal.classList.contains('hidden') &&
            !basketModal.contains(e.target) &&
            !basketBtn.contains(e.target) &&
            !e.target.classList.contains('basketModal__deleteBtn')
        ) {
            basketModal.classList.add('hidden')
        }
    })
}

export const updateAddToBasketBtn = (id) => {
    const buttons = document.querySelectorAll('.addToBasketBtn')

    buttons.forEach(item => {
        if (id && id !== item.dataset.id) return;
        item.innerText = addToBasketBtnTexts.notAdded
        item.classList.remove('mainBtn_reserved')
    })
}


const deleteItemFromBasket = () => {
    const deleteBtns = document.querySelectorAll('.basketModal__deleteBtn')

    deleteBtns.forEach(item => {
        item.addEventListener("click", (e) => {
            const basket = getBasketFromLocStore()
            const id = e.target.dataset.id
            const updatedBasket = basket.filter(item => item._id !== id)
            renderBasketModalContent(updatedBasket)
            showCount(updatedBasket)
            updateAddToBasketBtn(id)
            localStorage.setItem('basket', JSON.stringify(updatedBasket))
        })
    })
}

export const onClickReserveBtn = () => {
    const reserveBtn = document.querySelector('.reserveBtn')
    reserveBtn.addEventListener('click', () => {
        openReserveModal()
        renderBasketModalContent([])
        showCount([])
        updateAddToBasketBtn()
        localStorage.setItem('basket', JSON.stringify([]))
    })
}