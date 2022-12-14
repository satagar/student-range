const express = require('express')
const bodyparser = require('body-parser')
const app = express()
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
const PORT = process.env.PORT || 4000
app.listen((PORT), (error) => {
    if (!error) {
        console.log('connected')
    } else {
        console.log(error)
    }
})