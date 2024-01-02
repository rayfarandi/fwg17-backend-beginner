require('dotenv').config({
    path: './.env'
})

global.path = __dirname

const express =  require('express')
// sebuah variabel yang berisi package dari express, yg di buatkan fungsi express
const cors = require('cors')
const morgan = require('morgan')


const app= express()
//memanggil fungsi express yang di jadikan variabel app , yg akan return objek express

app.use(express.urlencoded({extended: false}))
// mengaktifkan middelware bawaan dari express, agar memahami data yg di kirimkan penguna dari body

app.use(morgan('dev'))
app.use(cors())

app.use('/',require('./src/routers'))
// secara otomatis akan melakukan import ke folder routers dengan nama index.js
app.use('/uploads/products',express.static('uploads/products')) //menambahkan express static untuk image

app.get('/',(req,res)=>{
// ketika mencoba get dari http untuk path '/' , yang akan mengembalikan req/request dan res/respons
     return res.json({
    // mengembalikan respons json
        succces: true,
        message: 'Backend is running well'
        //isi json jika berhasil
    })
})


app.listen(process.env.PORT, ()=>{
// objeck dari express untuk memulai server http dengan port 8888
    console.log(`App listening on port ${process.env.PORT}`)
    // menampilkan jika object express untuk memulai/menjalankan server port 8888 berhasil di run 
})