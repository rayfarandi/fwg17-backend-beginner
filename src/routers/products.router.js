const productRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'productRouter'

const productController = require ('../controllers/product.controller')
//adalah fungsi dari variabel 'productController' yang mengimport modul dari lokasi product.controller
productRouter.get('/',productController.getAllproducts)
//ketika mendapatkan '/' product dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllproducts dari controller product.controller untuk melihat semua data products
productRouter.get('/:id',productController.getDetailproduct)
//ketika mendapatkan '/:id' product dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailproduct dari controller product.controller untuk melihat data product by id
productRouter.post('/',productController.createproduct)
//ketika mendapatkan '/' product dari http dengan permintaan post, dan akan menjalankan fungsi createproduct dari product.controller
productRouter.patch('/:id',productController.updateproduct)
//ketika mendapatkan '/:id' product dari http dengan permintaan patch, dan akan menjalankan fungsi updateproduct dari product.controller untuk data product by id
productRouter.delete('/:id',productController.deleteproduct)
//ketika mendapatkan '/:id' product dari http dengan permintaan delete, dan akan menjalankan fungsi deleteproduct dari product.controller untuk data product by id


module.exports = productRouter
// membuat modul productRouter yg dapat di gunakan fungsinya