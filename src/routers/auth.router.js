const authRouter =require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'authRouter'

const authController = require('../controllers/auth.controller')
//adalah fungsi dari variabel 'authController' yang mengimport modul dari lokasi auth.controller

authRouter.post('/login',authController.login)
// authRouter.get('/logout',authController.logout)
//ketika mendapatkan '/' user dari http dengan permintaan post, dan akan menjalankan fungsi authRouter dari authController.login
authRouter.post('/register',authController.register)
module.exports = authRouter
// membuat modul authRouter yg dapat di gunakan fungsinya