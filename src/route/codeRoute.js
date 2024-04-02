import express from "express"
import { getCode, verifyCode } from "../controller/codeController.js"


const codeRouter = express.Router()

codeRouter.get("/", getCode)
codeRouter.post("/use", verifyCode)

export {
    codeRouter
}