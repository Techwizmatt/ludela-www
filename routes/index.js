const path = require('path')
const express = require('express')
const app = express()

app.use('/ludela', require(path.join(process.cwd(), '/routes/ludela')))

module.exports = app
