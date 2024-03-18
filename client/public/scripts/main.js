import {closeBasketModal, showCount, toggleBasketModal,onClickReserveBtn} from "./modules/basket.js";
import {closeReserveModal} from "./modules/reserveModal.js";





window.addEventListener('DOMContentLoaded',() => {
    // close reserve modal
    onClickReserveBtn()
    // close reserve modal
    closeReserveModal()
    // show basket count
    showCount()
    //open/close basket modal
    toggleBasketModal()
    //close basket modal on click outside
    closeBasketModal()
})

