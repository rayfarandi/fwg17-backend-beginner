const messageRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'messageRouter'

const messageController = require ('../../controllers/admin/messages.controller')
//adalah fungsi dari variabel 'messageController' yang mengimport modul dari lokasi message.controller
messageRouter.get('/',messageController.getAllmessages)
//ketika mendapatkan '/' message dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllmessages dari controller message.controller untuk melihat semua data messages
messageRouter.get('/:id',messageController.getDetailmessage)
//ketika mendapatkan '/:id' message dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailmessage dari controller message.controller untuk melihat data message by id
messageRouter.post('/',messageController.createmessage)
//ketika mendapatkan '/' message dari http dengan permintaan post, dan akan menjalankan fungsi createmessage dari message.controller
messageRouter.patch('/:id',messageController.updatemessage)
//ketika mendapatkan '/:id' message dari http dengan permintaan patch, dan akan menjalankan fungsi updatemessage dari message.controller untuk data message by id
messageRouter.delete('/:id',messageController.deletemessage)
//ketika mendapatkan '/:id' message dari http dengan permintaan delete, dan akan menjalankan fungsi deletemessage dari message.controller untuk data message by id


module.exports = messageRouter
// membuat modul messageRouter yg dapat di gunakan fungsinya