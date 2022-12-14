const { builtinModules } = require('module')
const mongoose = require('mongoose')
mongoose.connect = ('mongodb://localhost:27017', { useUnifiedTopology: true, useNewUrlParser: true })
var conn = mongoose.connection

conn.once('open', function () {
    console.log('DB connected successfully.........')
})

module.exports = conn