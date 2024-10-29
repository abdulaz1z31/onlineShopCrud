import express from "express"
import dotenv from "dotenv"
import {basketRouter, productRouter, userRouter} from "./routes/index.routes.js"
import { connectDatabase } from "./database/database.js"
import { createTables } from "./database/table.js"
dotenv.config()
const PORT = process.env.PORT

const app = express()
app.use(express.json())


app.use("/users", userRouter)
app.use("/products", productRouter)
app.use("/basket", basketRouter)

app.use((req, res) => {
    res.status(404).json({ message: "Not Found" });
});
  

app.listen(PORT, () => {
    console.log(`server is running on ${PORT} port`);
    try {
        connectDatabase()
        createTables()
    } catch (err) {
        console.log(`xatolik yuz berdi: ${err.message} `);
    }
});

