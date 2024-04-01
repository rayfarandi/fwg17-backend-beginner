
const { errorHelper } = require('../moduls/check')

const productModel = require('../models/products.model')

exports.getAllproducts = async (req, res) => {   
    try {
        const {searchKey, sortBy, order, page=1, limit, best_seller} = req.query
        const limitData = parseInt(limit) || 6

        const count = await productModel.countAll(searchKey)
        const listProducts = await productModel.findAll(searchKey, sortBy, order, page, limitData, best_seller)

        const totalPage = Math.ceil(count / limitData)
        const nextPage = parseInt(page) + 1
        const prevPage = parseInt(page) - 1

        return res.json({
            success: true,
            message: 'List all products',
            pageInfo: {
                currentPage: parseInt(page),
                nextPage: nextPage <= totalPage ? nextPage : null,
                totalPage,
                prevPage: prevPage > 1 ? prevPage : null,
                totalData: parseInt(count)
            },
            results: listProducts
        })
    } catch (error) {
        errorHelper(error, res)
    }
}

exports.getProductDetail = async (req, res) =>{
    try{
        const {id} = Number(req.params.id)
        const products = await productModel.findCombine(id)
        console.log(products)
        return res.json({
            success: true,
            message: 'List Product'
        })
    }
    // catch(error){
    //     return res.status(500).json({
    //         success: false,
    //         message: 'Internal Server error'
    //     })
    // }
    catch(error){
        errorHelper(error,res)
    }
}