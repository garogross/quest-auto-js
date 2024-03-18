import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const colorSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('name')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const Color = mongoose.model('Color',colorSchema)
