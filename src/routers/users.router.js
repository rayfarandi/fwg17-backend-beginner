const userRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'userRouter'

const userController = require ('../controllers/user.controller')
//adalah fungsi dari variabel 'userController' yang mengimport modul dari lokasi user.controller
userRouter.get('/',userController.getAllUsers)
//ketika mendapatkan '/' user dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllUsers dari controller user.controller
userRouter.get('/:id',userController.getDetailUser)
userRouter.post('/',userController.createUser)
userRouter.patch('/',userController.updateUsers)
userRouter.delete('/',userController.deleteUsers)


module.exports = userRouter