const userRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'userRouter'

const userController = require ('../controllers/user.controller')
//adalah fungsi dari variabel 'userController' yang mengimport modul dari lokasi user.controller
userRouter.get('/',userController.getAllUsers)
//ketika mendapatkan '/' user dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllUsers dari controller user.controller untuk melihat semua data users
userRouter.get('/:id',userController.getDetailUser)
//ketika mendapatkan '/:id' user dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailUser dari controller user.controller untuk melihat data user by id
userRouter.post('/',userController.createUser)
//ketika mendapatkan '/' user dari http dengan permintaan post, dan akan menjalankan fungsi createuser dari user.controller
userRouter.patch('/:id',userController.updateUser)
//ketika mendapatkan '/:id' user dari http dengan permintaan patch, dan akan menjalankan fungsi updateUser dari user.controller untuk data user by id
userRouter.delete('/:id',userController.deleteUser)


module.exports = userRouter