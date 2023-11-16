const userRouter = require('express').Router()

const userController = require ('../controllers/user.controller')
userRouter.get('/',userController.getAllUsers)
userRouter.get('/:id',userController.getAllUsersID)
userRouter.post('/',userController.createUsers)
userRouter.patch('/',userController.updateUsers)
userRouter.delete('/',userController.deleteUsers)


module.exports = userRouter