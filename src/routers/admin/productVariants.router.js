const productVariantRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'productVariantRouter'

const productVariantController = require ('../../controllers/admin/productVariant.controller')
//adalah fungsi dari variabel 'productVariantController' yang mengimport modul dari lokasi productVariant.controller
productVariantRouter.get('/',productVariantController.getAllproductVariants)
//ketika mendapatkan '/' productVariant dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllproductVariants dari controller productVariant.controller untuk melihat semua data productVariants
productVariantRouter.get('/:id',productVariantController.getDetailproductVariant)
//ketika mendapatkan '/:id' productVariant dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailproductVariant dari controller productVariant.controller untuk melihat data productVariant by id
productVariantRouter.post('/',productVariantController.createproductVariant)
//ketika mendapatkan '/' productVariant dari http dengan permintaan post, dan akan menjalankan fungsi createproductVariant dari productVariant.controller
productVariantRouter.patch('/:id',productVariantController.updateproductVariant)
//ketika mendapatkan '/:id' productVariant dari http dengan permintaan patch, dan akan menjalankan fungsi updateproductVariant dari productVariant.controller untuk data productVariant by id
productVariantRouter.delete('/:id',productVariantController.deleteproductVariant)
//ketika mendapatkan '/:id' productVariant dari http dengan permintaan delete, dan akan menjalankan fungsi deleteproductVariant dari productVariant.controller untuk data productVariant by id


module.exports = productVariantRouter
// membuat modul productVariantRouter yg dapat di gunakan fungsinya