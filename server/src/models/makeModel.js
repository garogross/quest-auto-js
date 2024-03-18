import mongoose from "mongoose";
import {setRequiredProp} from "../utils/setRequiredProp.js";

const makeSchema = new mongoose.Schema({
    name: {
        type: String,
        ...setRequiredProp('name')
    },
},{
    toJSON: {virtuals: true},
    toObject: {virtuals: true}
})


export const Make = mongoose.model('Make',makeSchema)
