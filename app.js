require("dotenv").config()

require("./db")

const express = require("express")

const app = express()

require("./config")(app)
require("./routes/index")(app)
require("./error-handling")(app)

module.exports = app
