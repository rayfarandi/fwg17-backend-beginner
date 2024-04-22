const { describe, it } = require('mocha')
const { expect } = require('chai')

const productController = require('../controllers/admin/product.controller')

const req = {
  query: {}
}
const res = {
  status: (status) => {
    return res
  },
  json: (params) => {
    return params
  }
}

describe('List all products', () => {
  it('List all products', async () => {
    const response = await productController.getAllProducts(req, res)
    expect(response.success).to.be.eq(true)
  })

  it('nextPage should be null', async () => {
    const req = {
      query: { page: '1' }
    }
    const response = await productController.getAllProducts(req, res)
    expect(response.pageInfo.nextPage).to.be.eq(2)
  })
  it('prevPage should be null', async () => {
    const req = {
      query: { page: '1' }
    }
    const response = await productController.getAllProducts(req, res)
    expect(response.pageInfo.prevPage).to.be.eq(null)
  })
  it('no data found', async () => {
    const req = {
      query: { searchKey: 'fx' }
    }
    const response = await productController.getAllProducts(req, res)
    expect(response.message).to.be.eq('product not found')
  })
})

describe('detail product', () => {
  const req = {
    params: { id: 1 }
  }
  const res = {
    status: (status) => {
      return res
    },
    json: (params) => {
      return params
    }
  }

  it('should return success true', async () => {
    const response = await productController.getDetailproduct(req, res)
    expect(response.success).to.be.eq(true)
  })
  it('product not found', async () => {
    const req = {
      params: { id: '10000' }
    }
    const response = await productController.getDetailproduct(req, res)
    expect(response.message).to.be.eq('product not found')
  })
})

// describe('create product', () => {

//     it('should return create success', async() => {
//         const req = {
//             body: {
//                 name: "nama barang1",
//                 description: "deskripsi 1",
//                 basePrice: 25000,
//             }
//         }
//         const response = await productController.createproduct(req, res)
//         expect(response.success).to.be.eq(true)
//     })

//     it('should return products with name nama barang1 already exist', async() => {
//         const req = {
//             body: {
//                 name: "nama barang1",
//                 description: "deskripsi 1",
//                 basePrice: 25000,
//             }
//         }
//         const response = await productController.createproduct(req, res)
//         expect(response.message).to.be.eq("products with name nama barang1 already exist")
//     })
// })

// describe('update product',()=>{
//     const req ={
//         params:{id:84},
//         body:{description:"ganti deskripsi"}
//     }
//     it('should return true',async()=>{
//         const response =await productController.updateproduct(req,res)
//         expect(response.success).to.be.eq(true)
//     })

// })

describe('delete product', () => {
  const req = {
    params: { id: 60 }
  }

  it('should return success true', async () => {
    const response = await productController.deleteproduct(req, res)
    expect(response.success).to.be.eq(true)
  })
})
