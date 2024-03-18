import express from "express";
import {
    createCar, deleteCar, formatCarProps,
    getAllCar,
    resizeCarPhoto, searchCars, uploadCarPhoto,
} from "../controllers/carController.js";

export const carRouter = express.Router()


carRouter.get('/', getAllCar)
carRouter.delete('/:id', deleteCar)
carRouter.post(
    '/create',
    uploadCarPhoto,
    resizeCarPhoto,
    formatCarProps,
    createCar
)
carRouter.get('/search/',searchCars)
