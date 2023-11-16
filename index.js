const express =  require('express')

const app= express()

app.use(express.urlencoded({extended: false}))

app.use('/',require('./src/routers'))
// secara otomatis akan melakukan import ke folder routers dengan nama index.js

app.get('/',(req,res)=>{
     return res.json({
        succces: true,
        message: 'Backend is running well'
    })
})


app.listen(8888,()=>{
    console.log('app listening on port 8888')
})