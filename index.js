const express = require('express')
const bodyparser = require('body-parser')
const conn = require('./connections/db.connection')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
    console.log("Server Connected........")
})