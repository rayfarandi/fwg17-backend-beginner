const productTagRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'productTagRouter'

const productTagController = require ('../controllers/productTags.controller')
//adalah fungsi dari variabel 'productTagController' yang mengimport modul dari lokasi productTag.controller
productTagRouter.get('/',productTagController.getAllproductTags)
//ketika mendapatkan '/' productTag dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllproductTags dari controller productTag.controller untuk melihat semua data productTags
productTagRouter.get('/:id',productTagController.getDetailproductTag)
//ketika mendapatkan '/:id' productTag dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailproductTag dari controller productTag.controller untuk melihat data productTag by id
productTagRouter.post('/',productTagController.createproductTag)
//ketika mendapatkan '/' productTag dari http dengan permintaan post, dan akan menjalankan fungsi createproductTag dari productTag.controller
productTagRouter.patch('/:id',productTagController.updateproductTag)
//ketika mendapatkan '/:id' productTag dari http dengan permintaan patch, dan akan menjalankan fungsi updateproductTag dari productTag.controller untuk data productTag by id
productTagRouter.delete('/:id',productTagController.deleteproductTag)
//ketika mendapatkan '/:id' productTag dari http dengan permintaan delete, dan akan menjalankan fungsi deleteproductTag dari productTag.controller untuk data productTag by id


module.exports = productTagRouter
// membuat modul productTagRouter yg dapat di gunakan fungsinya