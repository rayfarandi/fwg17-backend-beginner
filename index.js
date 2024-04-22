require('dotenv').config({
  path: './.env'
})

global.path = __dirname

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors())

// app.use(cors({
//   origin: 'https://rans-cofee-shop.netlify.app', // Ganti dengan origin yang diizinkan
//   methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
//   allowedHeaders: 'Content-Type, Authorization, Origin, X-Requested-With, Accept',
//   credentials: true
// }))

app.use('/uploads', express.static('uploads'))// menambahkan express static untuk image

app.use('/', require('./src/routers'))

app.get('/', (req, res) => {
  return res.json({
    success: true,
    message: 'Backend is running well'
  })
})

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})

module.exports = app
