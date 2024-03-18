import express from "express";
import {getOptions} from "../controllers/optionsController.js";

export const optionsRouter = express.Router()


optionsRouter.get('/',getOptions)