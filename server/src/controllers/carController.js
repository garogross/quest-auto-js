import {Car} from "../models/carModel.js";
import {HandlerFactory} from "./HandlerFactory.js";
import {uploadImage} from "../utils/multer.js";
import {catchAsync} from "../utils/catchAsync.js";
import {resizeImage} from "../utils/sharp.js";
import {Make} from "../models/makeModel.js";
import {AppError} from "../utils/appError.js";
import {Color} from "../models/colorModel.js";
import {CarModel} from "../models/carModelModel.js";


export const uploadCarPhoto = uploadImage.single("image")

export const resizeCarPhoto = catchAsync(async (req, res, next) => {
    if (!req.file) return next()

    const fileName = `car-${Date.now()}.jpeg`

    req.file.filename = fileName
    req.body.image = `cars/${fileName}`
    if(req.body.features) req.body.features = JSON.parse(req.body.features)
    await resizeImage(req.file.buffer, `public/cars/${req.file.filename}`)
    next()
})

// set make,model and color props as Object.id
export const formatCarProps = catchAsync(async (req, res, next) => {
    const checkProp = async (model, propName, addProps) => {
        const prop = req.body[`${propName}`]
        if (!prop) {
            return next(new AppError(`${propName} is required`, 400, {[propName]: 1}))
        }
        const curDoc = await model.findOne({name: prop.toLowerCase(),...addProps})
        if (curDoc) {
            req.body[propName] = curDoc._id
        } else {
            const newDoc = await model.create({name: prop.toLowerCase(), ...addProps})
            req.body[propName] = newDoc._id
        }

        return req.body[propName]
    }
    const newMake = await checkProp(Make, 'make')
    await checkProp(CarModel, 'model',{make: newMake})
    await checkProp(Color, 'color')

    next()
})

const handleFactory = new HandlerFactory(Car, 'car')

export const createCar = handleFactory.create()
export const deleteCar = handleFactory.deleteOne()

export const getAllCar = handleFactory.getAll('make model color')


export const searchCars = catchAsync(async (req,res) => {

    const populateOptions = {
        path: 'make'
    }
    if(req.query.make) {
        populateOptions.match =  { name: new RegExp(req.query.make, 'i') }

    }

    const cars = await Car.find().populate(populateOptions).populate('model color')
        .exec();


    const data = cars.filter(item => item.make)
    res.send({
        result: data.length,
        status: "success",
        data
    })
})