import mongoose from "mongoose";

const codeSchema = new mongoose.Schema(
    {
        code: {
            type: String,
            required: true
        },
        expiry: { type: Date },
        is_verified: {
            type: String,
            enum: ["YES", "NO"],
            default: "NO"
        }
    },
    { timestamps: true }
)

export const Code = mongoose.model("Codes", codeSchema)

