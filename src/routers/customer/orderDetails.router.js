const orderDetailRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'orderDetailRouter'

const orderDetailController = require ('../../controllers/admin/orderDetails.controller')
//adalah fungsi dari variabel 'orderDetailController' yang mengimport modul dari lokasi orderDetail.controller
orderDetailRouter.get('/',orderDetailController.getAllorderDetails)
//ketika mendapatkan '/' orderDetail dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllorderDetails dari controller orderDetail.controller untuk melihat semua data orderDetails
orderDetailRouter.get('/:id',orderDetailController.getDetailorderDetail)
//ketika mendapatkan '/:id' orderDetail dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailorderDetail dari controller orderDetail.controller untuk melihat data orderDetail by id
orderDetailRouter.post('/',orderDetailController.createorderDetail)
//ketika mendapatkan '/' orderDetail dari http dengan permintaan post, dan akan menjalankan fungsi createorderDetail dari orderDetail.controller
orderDetailRouter.patch('/:id',orderDetailController.updateorderDetail)
//ketika mendapatkan '/:id' orderDetail dari http dengan permintaan patch, dan akan menjalankan fungsi updateorderDetail dari orderDetail.controller untuk data orderDetail by id
orderDetailRouter.delete('/:id',orderDetailController.deleteorderDetail)
//ketika mendapatkan '/:id' orderDetail dari http dengan permintaan delete, dan akan menjalankan fungsi deleteorderDetail dari orderDetail.controller untuk data orderDetail by id


module.exports = orderDetailRouter
// membuat modul orderDetailRouter yg dapat di gunakan fungsinya