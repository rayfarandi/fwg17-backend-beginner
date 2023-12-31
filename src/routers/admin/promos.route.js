const promoRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'promoRouter'

const promoController = require ('../../controllers/admin/promos.controller')
//adalah fungsi dari variabel 'promoController' yang mengimport modul dari lokasi promo.controller
promoRouter.get('/',promoController.getAllpromos)
//ketika mendapatkan '/' promo dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllpromos dari controller promo.controller untuk melihat semua data promos
promoRouter.get('/:id',promoController.getDetailpromo)
//ketika mendapatkan '/:id' promo dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailpromo dari controller promo.controller untuk melihat data promo by id
promoRouter.post('/',promoController.createpromo)
//ketika mendapatkan '/' promo dari http dengan permintaan post, dan akan menjalankan fungsi createpromo dari promo.controller
promoRouter.patch('/:id',promoController.updatepromo)
//ketika mendapatkan '/:id' promo dari http dengan permintaan patch, dan akan menjalankan fungsi updatepromo dari promo.controller untuk data promo by id
promoRouter.delete('/:id',promoController.deletepromo)
//ketika mendapatkan '/:id' promo dari http dengan permintaan delete, dan akan menjalankan fungsi deletepromo dari promo.controller untuk data promo by id


module.exports = promoRouter
// membuat modul promoRouter yg dapat di gunakan fungsinya