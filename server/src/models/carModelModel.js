import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const carModelSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('Name')
    },
    make: {
        type: mongoose.Schema.ObjectId,
        ref: "Make",
        ...setRequiredProp('make')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const CarModel = mongoose.model('CarModel',carModelSchema)
