const express = require("express");
const router = require("./Routes/routes.auth")
const mongoose = require("mongoose")
require("dotenv").config();
const dbConfig = require('./Configs/dbConfig')

const app = express();
app.use(express.json());
const Port = process.env.PORT;

mongoose.connect(dbConfig.DB_URL, { family: 4 }, (error) => {
    if (error) {
        console.log("Error Occurred!")
    } else {
        console.log('Node Environment :', process.env.NODE_ENV)
        console.log("App is Connected to Db", dbConfig.DB_NAME)

        app.use("/", router)

        app.listen(Port, () => {
            console.log(`App is listening at port:${Port}`)
        })

    }
})