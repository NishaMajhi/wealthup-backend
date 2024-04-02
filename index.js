import express from 'express';
import "dotenv/config";
import cors from 'cors';

import { connectDB } from './src/database/connect.js';
import { codeRouter } from './src/route/codeRoute.js';
import { errorHanlder } from './src/middleware/errorMiddleware.js';

const PORT = process.env.PORT || 5000
const app = express()

app.use(cors())
app.use(express.json())

app.use("/api/codes/", codeRouter)

app.get("/", (req, res) => {
    res.send("hello, wealth up here")
})

app.use(errorHanlder)

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is running at http://localhost:${PORT}`)
        })
    })
    .catch((err) => {
        console.log('MongoDB Connection Failed', err);
    })
