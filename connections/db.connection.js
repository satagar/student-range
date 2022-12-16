const mongoose = require('mongoose')
const DB_URI = require('../configs/db.config')
mongoose.connect = (process.env.DB_URI, { useUnifiedTopology: true, useNewUrlParser: true })
var conn = mongoose.connection

conn.once('open', function () {
    console.log('DB connected successfully.........')
})

module.exports = conn