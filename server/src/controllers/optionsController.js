import {catchAsync} from "../utils/catchAsync.js";
import {Color} from "../models/colorModel.js";
import {Make} from "../models/makeModel.js";
import {CarModel} from "../models/carModelModel.js";


export const getOptions = catchAsync(async  (req,res,next) => {
    const colors = await Color.find()
    const makes = await Make.find()
    const models = await CarModel.find()

    res.send({
        status: 'success',
        colors,
        makes,
        models,
    })
})