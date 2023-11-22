const productSizeRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'productSizeRouter'

const productSizeController = require ('../../controllers/admin/productSize.controller')
//adalah fungsi dari variabel 'productSizeController' yang mengimport modul dari lokasi productSize.controller
productSizeRouter.get('/',productSizeController.getAllproductSizes)
//ketika mendapatkan '/' productSize dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllproductSizes dari controller productSize.controller untuk melihat semua data productSizes
productSizeRouter.get('/:id',productSizeController.getDetailproductSize)
//ketika mendapatkan '/:id' productSize dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailproductSize dari controller productSize.controller untuk melihat data productSize by id
productSizeRouter.post('/',productSizeController.createproductSize)
//ketika mendapatkan '/' productSize dari http dengan permintaan post, dan akan menjalankan fungsi createproductSize dari productSize.controller
productSizeRouter.patch('/:id',productSizeController.updateproductSize)
//ketika mendapatkan '/:id' productSize dari http dengan permintaan patch, dan akan menjalankan fungsi updateproductSize dari productSize.controller untuk data productSize by id
productSizeRouter.delete('/:id',productSizeController.deleteproductSize)
//ketika mendapatkan '/:id' productSize dari http dengan permintaan delete, dan akan menjalankan fungsi deleteproductSize dari productSize.controller untuk data productSize by id


module.exports = productSizeRouter
// membuat modul productSizeRouter yg dapat di gunakan fungsinya