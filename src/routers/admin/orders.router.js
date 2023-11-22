const orderRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'orderRouter'

const orderController = require ('../../controllers/admin/orders.controller')
//adalah fungsi dari variabel 'orderController' yang mengimport modul dari lokasi order.controller
orderRouter.get('/',orderController.getAllorders)
//ketika mendapatkan '/' order dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllorders dari controller order.controller untuk melihat semua data orders
orderRouter.get('/:id',orderController.getDetailorder)
//ketika mendapatkan '/:id' order dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailorder dari controller order.controller untuk melihat data order by id
orderRouter.post('/',orderController.createorder)
//ketika mendapatkan '/' order dari http dengan permintaan post, dan akan menjalankan fungsi createorder dari order.controller
orderRouter.patch('/:id',orderController.updateorder)
//ketika mendapatkan '/:id' order dari http dengan permintaan patch, dan akan menjalankan fungsi updateorder dari order.controller untuk data order by id
orderRouter.delete('/:id',orderController.deleteorder)
//ketika mendapatkan '/:id' order dari http dengan permintaan delete, dan akan menjalankan fungsi deleteorder dari order.controller untuk data order by id


module.exports = orderRouter
// membuat modul orderRouter yg dapat di gunakan fungsinya