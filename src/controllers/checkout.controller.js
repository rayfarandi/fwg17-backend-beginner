const db = require('../lib/db.lib')
const moment = require('moment')

const checkoutModel = require('../models/checkout.model')
const { errorHandler } = require('../moduls/check')

exports.getPriceSize = async (req, res) => {
  try {
    const size = await checkoutModel.getDataSize(req.query.name)
    return res.json({
      success: true,
      message: 'detail size',
      results: size
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.getPriceVariant = async (req, res) => {
  try {
    const size = await checkoutModel.getDataVariant(req.query.name)
    return res.json({
      success: true,
      message: 'detail variant',
      results: size
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.getOrderProducts = async (req, res) => {
  const { id: userId } = req.user

  try {
    const { sortBy, order, page = 1, limit, orderId } = req.query
    const limitData = parseInt(limit) || 5

    const count = await checkoutModel.countAll(orderId)
    const listOrderDetails = await checkoutModel.findOrderProducts(sortBy, order, page, limitData, orderId, userId)

    const totalPage = Math.ceil(count / limitData)
    const nextPage = parseInt(page) + 1
    const prevPage = parseInt(page) - 1

    return res.json({
      success: true,
      message: 'get all order products',
      pageInfo: {
        currentPage: parseInt(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: parseInt(count)
      },
      results: listOrderDetails
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.createOrder = async (req, res) => {
  try {
    await db.query('BEGIN')

    const { id: userId } = req.user
    // const {products, deliveryShipping} = req.body
    const { productId, sizeProduct, variantProduct, quantityProduct, deliveryShipping } = req.body
    if (!productId || !sizeProduct || !variantProduct || !quantityProduct || !deliveryShipping) {
      const missingFields = []
      if (!productId) missingFields.push('productId')
      if (!sizeProduct) missingFields.push('sizeProduct')
      if (!variantProduct) missingFields.push('variantProduct')
      if (!quantityProduct) missingFields.push('quantityProduct')
      if (!deliveryShipping) missingFields.push('deliveryShipping')

      return res.status(400).json({
        success: false,
        message: 'Missing required fields',
        missingFields
      })
    }

    const idProduct = productId.split(',')
    const size = sizeProduct.split(',')
    const variant = variantProduct.split(',')
    const quantity = quantityProduct.split(',')

    console.log(idProduct)
    console.log(size)
    console.log(variant)
    console.log(quantity)

    const date = moment(new Date())
    const orderNumber = `${date.format('YY')}${date.format('M').padStart(2, '0')}${date.format('D').padStart(2, '0')}${Math.floor(Math.random() * 1000)}`
    const status = 'On Progress'
    const deliveryFee = 5000
    let order = await checkoutModel.insertOrder(userId, orderNumber, deliveryFee, status, deliveryShipping)
    // let order = await checkoutModel.insertOrder(userId, orderNumber, deliveryFee, status, deliveryShipping, deliveryAddress, fullName, email)
    console.log(order)

    for (let i = 0; i < idProduct.length; i++) {
      try {
        const sizeId = await checkoutModel.getDataSize(size[i])
        const variantId = await checkoutModel.getDataVariant(variant[i])
        const orderDetails = await checkoutModel.insertOrderDetails(order.id, parseInt(idProduct[i]), sizeId.id, variantId.id, parseInt(quantity[i]))
        await checkoutModel.countSubtotal(orderDetails.id)
      } catch (error) {
        console.log(error.message)
        await db.query('ROLLBACK')
      }
    }

    await checkoutModel.countTotal(order.id)
    await checkoutModel.countTax(order.Id)
    // await checkoutModel.countTotalTransaction(order.id)
    order = await checkoutModel.countTotalTransaction(order.id)

    await db.query('COMMIT')

    return res.json({
      success: true,
      messages: 'create order successfully',
      results: order
    })
  } catch (error) {
    await db.query('ROLLBACK')
    errorHandler(error, res)
  }
}
