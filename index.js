require('dotenv').config({
  path: './.env' 
}) 

global.path = __dirname


const express = require('express')
const cors = require('cors')
const morgan = require('morgan') 

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(morgan('dev'))
app.use(cors({}))
app.use('/uploads/products', express.static('uploads/products'))
app.use('/uploads/users', express.static('uploads/users'))
app.use('/uploads/testimonial', express.static('uploads/testimonial'))



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