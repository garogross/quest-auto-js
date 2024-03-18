import dotenv from "dotenv";
import {app} from "./app.js";
import mongoose from "mongoose";

// use config
dotenv.config({path: './config.env'})

// close server on errors
process.on('uncaughtException', (err) => {
    process.exit(1)
})


const db = process.env.DATABASE

// connect to mongo DB
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((con) => {
    console.log(`db ${db} connected`)
}).catch(err => console.log(err))

const port = process.env.PORT || 5000

// start server
const server = app.listen(port, () => {
    console.log(`App is running on port ${port}`)
})


process.on('unhandledRejection', (err) => {
    server.close(() => {
        process.exit(1)
    })
})
