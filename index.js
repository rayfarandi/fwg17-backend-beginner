const express =  require('express')
// sebuah variabel yang berisi package dari express, yg di buatkan fungsi express

const app= express()
//memanggil fungsi express yang di jadikan variabel app , yg akan return objek express

app.use(express.urlencoded({extended: false}))

app.use('/',require('./src/routers'))
// secara otomatis akan melakukan import ke folder routers dengan nama index.js

app.get('/',(req,res)=>{
// ketika mencoba get dari http untuk path '/' , yang akan mengembalikan req/request dan res/respons
     return res.json({
    // mengembalikan respons json
        succces: true,
        message: 'Backend is running well'
        //isi json jika berhasil
    })
})


app.listen(8888,()=>{
// objeck dari express untuk memulai server http dengan port 8888
    console.log('app listening on port 8888')
    // menampilkan jika object express untuk memulai/menjalankan server port 8888 berhasil di run
})