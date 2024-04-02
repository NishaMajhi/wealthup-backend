import asyncHandler from "express-async-handler"
import otpGenerator from "otp-generator"
import { Code } from "../model/code.js"

const verifyCode = asyncHandler(async (req, res) => {
    try {
        const { code } = req.body
        if (!code || code === "") {
            throw new Error("Enter a valid code")
        }

        const checkCode = await Code.findOne(
            {
                code: code
            }
        )
        if (!checkCode) {
            throw new Error(`Code is incorrect`)
        }

        if (checkCode && checkCode.is_verified === "YES") {
            throw new Error("This code has been used already")
        }

        const currentTime = new Date()
        if (checkCode.expiry < currentTime) {
            throw new Error("The code has expired")
        }

        const updateCodeStatus = await Code.updateOne(
            {
                code: code
            },
            {
                $set: {
                    is_verified: "YES"
                }
            }
        )
        if (!updateCodeStatus) {
            throw new Error("Error while updating code status")
        }

        res.status(200).json({ message: "Code is correct" })

    } catch (error) {
        throw new Error(error.message)
    }
})


const getCode = asyncHandler(async (req, res) => {
    try {

        const code = otpGenerator.generate(6,
            { specialChars: false, lowerCaseAlphabets: true, upperCaseAlphabets: true }
        );

        const currentTime = new Date()
        const expiryTime = new Date(currentTime.getTime() + 1 * 60 * 1000);

        const insertCode = await Code.create(
            {
                code: code,
                expiry: expiryTime,
                is_verified: "NO"
            }
        )
        if (!insertCode) {
            throw new Error("Error while insering code into DB")
        }

        res.status(200).json({ message: "Code inserted Successfully", code: code })

    } catch (error) {
        throw new Error(error.message)
    }
})

export {
    verifyCode,
    getCode
}