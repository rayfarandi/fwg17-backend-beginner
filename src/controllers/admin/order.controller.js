const orderModel = require('../../models/order.model')
const { errorHandler } = require('../../moduls/check')

exports.getAllOrders = async (req, res) => {
  const { id } = req.user
  try {
    const { page = 1, limit, status } = req.query
    const limitData = parseInt(limit) || 4

    const count = await orderModel.countAll(id, status)
    const listOrders = await orderModel.findAll(parseInt(id), page, limitData, status)

    const totalPage = Math.ceil(count / limitData)
    const nextPage = parseInt(page) + 1
    const prevPage = parseInt(page) - 1

    return res.json({
      success: true,
      messages: 'List all orders',
      pageInfo: {
        currentPage: parseInt(page),
        totalPage,
        nextPage: nextPage <= totalPage ? nextPage : null,
        prevPage: prevPage >= 1 ? prevPage : null,
        totalData: parseInt(count)
      },
      results: listOrders
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.getDetailOrder = async (req, res) => {
  try {
    const order = await orderModel.findOne(parseInt(req.params.id))
    return res.json({
      success: true,
      messages: 'detail order',
      results: order
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.createOrder = async (req, res) => {
  const { id: userId } = req.user
  try {
    const order = await orderModel.insert(userId, req.body)
    return res.json({
      success: true,
      messages: 'create order successfully',
      results: order
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.updateOrder = async (req, res) => {
  try {
    const order = await orderModel.update(parseInt(req.params.id), req.body)
    if (order === 'No data has been modified') {
      return res.status(200).json({
        success: true,
        messages: order
      })
    }
    return res.json({
      success: true,
      messages: 'update order successfully',
      results: order
    })
  } catch (error) {
    errorHandler(error, res)
  }
}

exports.deleteOrder = async (req, res) => {
  try {
    const order = await orderModel.delete(parseInt(req.params.id))
    return res.json({
      success: true,
      messages: 'delete order successfully',
      results: order
    })
  } catch (error) {
    errorHandler(error, res)
  }
}
