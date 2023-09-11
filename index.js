const express = require('express')

const dotenv = require('dotenv').config()
const connectDB = require('./config/db')

const cors = require('cors')

const port = process.env.PORT || 8080

connectDB()

const app = express()

app.options(
  '*',
  cors({
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200,
  }),
)
app.use(cors())
app.use(express.json()) // parse JSON data available in request body
app.use(express.urlencoded({ extended: false })) // parse URL-encoded data available in request body

app.use('/api/addresses', require('./routes/addressRoutes')) // add

// optional
app.get('/', (req, res) => {
  res.status(200).json("Welcome to Address Book!")
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})

module.exports = app
