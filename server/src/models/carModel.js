import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";
import {bodyTypes} from "../constants.js";


const carSchema = new mongoose.Schema({
    make: {
        type: mongoose.Schema.ObjectId,
        ref: "Make",
        ...setRequiredProp('Make')
    },
    model: {
        type: mongoose.Schema.ObjectId,
        ref: "CarModel",
        ...setRequiredProp('CarModel')
    },
    color: {
        type: mongoose.Schema.ObjectId,
        ref: "Color",
        ...setRequiredProp('Color')
    },
    year: {
        type: Number,
        ...setRequiredProp('year'),
        validate: {
            validator: function (v) {
                return v && v.length !== 4;
            },
            message: props => `Year must have 4 digits`
        }
    },
    price: {
        type: Number,
        ...setRequiredProp('price')
    },
    mileage: {
        type: Number,
        ...setRequiredProp('mileage')
    },
    description: {
        type: String,
    },
    features: [[String]],
    image: {
        type: String,
        ...setRequiredProp('image')
    },
    bodyType: {
        type: String,
        enum: bodyTypes,
        ...setRequiredProp('bodyType')
    }
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})

export const Car = mongoose.model('Car',carSchema)
