import express from "express"
import rateLimit from "express-rate-limit";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import {xss} from "express-xss-sanitizer";
import hpp from 'hpp'

import {AppError} from "./src/utils/appError.js";
import {globalErrorHandler} from "./src/controllers/errorController.js";
import cors from "cors"

// ROUTES1
import {carRouter} from "./src/routes/carRoutes.js";
import {optionsRouter} from "./src/routes/optionsRoutes.js";

export const app = express()

// add headers for secure

// access cors
app.use(cors())

// set security headers
app.use(helmet())


// save as json
app.use(express.json())

// limit requests
const limiter = rateLimit({
    skip: () => false, // or add your own logic for skipping rate limiting
    max: 10000,
    windowMs: 60 * 60 * 100000,
    message: 'Too many requests from this IP, please try again in an hour'
})


app.set('trust proxy', 1);
app.use('/api', limiter)



// disable queries in json
app.use(mongoSanitize())

// disabling html sending
app.use(xss())

// prevent multiple parameters
app.use(hpp({
    whitelist: []
}))

// serve files
app.use('/api', express.static('public'));

// ROUTES2
app.use('/api/v1/cars', carRouter)
app.use('/api/v1/options', optionsRouter)


app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} in this server`, 404))
})

// handle errors
app.use(globalErrorHandler)
