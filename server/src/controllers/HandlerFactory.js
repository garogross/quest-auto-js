import {catchAsync} from "../utils/catchAsync.js";
import {AppError} from "../utils/appError.js";
import {ApiFeatures} from "../utils/apiFeatures.js";

export class HandlerFactory {
    constructor(Model, docName) {
        this.Model = Model
        this.docName = docName
    }

    create() {
        const {Model} = this
        return catchAsync(async function (req, res) {
            const newTask = await Model.create(req.body)
            res.send({
                status: 'success',
                data: newTask
            })
        })
    }

    deleteOne () {
        const {Model,docName} = this
        return catchAsync(async function (req, res, next)  {
            const doc = await Model.findByIdAndDelete(req.params.id)

            if (!doc) {
                return next(new AppError(`No ${docName} found with that id`, 404))
            }

            res.status(200).send({
                status: 'success',
                data: doc
            })
        })

    }

    getAll(populateOptions) {
        const {Model} = this
        return catchAsync(async (req, res) => {
            let filter = {}
            let query = Model.find(filter)

            if(populateOptions) query = query.populate(populateOptions)

            const features = new ApiFeatures(query, req.query)
                .filter()

            const doc = await features.query
            res.send({
                status: 'success',
                result: doc.length,
                data: doc
            })
        })
    }
}