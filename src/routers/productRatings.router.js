const productRatingRouter = require('express').Router()
// untuk membuat route di modul express dan di simpan di variabel 'productRatingRouter'

const productRatingController = require ('../controllers/productRatings.controller')
//adalah fungsi dari variabel 'productRatingController' yang mengimport modul dari lokasi productRating.controller
productRatingRouter.get('/',productRatingController.getAllproductRatings)
//ketika mendapatkan '/' productRating dari http dengan mengunakan metod get, dan akan menjalankan fungsi getAllproductRatings dari controller productRating.controller untuk melihat semua data productRatings
productRatingRouter.get('/:id',productRatingController.getDetailproductRating)
//ketika mendapatkan '/:id' productRating dari http dengan mengunakan metod get, dan akan menjalankan fungsi getDetailproductRating dari controller productRating.controller untuk melihat data productRating by id
productRatingRouter.post('/',productRatingController.createproductRating)
//ketika mendapatkan '/' productRating dari http dengan permintaan post, dan akan menjalankan fungsi createproductRating dari productRating.controller
productRatingRouter.patch('/:id',productRatingController.updateproductRating)
//ketika mendapatkan '/:id' productRating dari http dengan permintaan patch, dan akan menjalankan fungsi updateproductRating dari productRating.controller untuk data productRating by id
productRatingRouter.delete('/:id',productRatingController.deleteproductRating)
//ketika mendapatkan '/:id' productRating dari http dengan permintaan delete, dan akan menjalankan fungsi deleteproductRating dari productRating.controller untuk data productRating by id


module.exports = productRatingRouter
// membuat modul productRatingRouter yg dapat di gunakan fungsinya