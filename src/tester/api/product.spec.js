const { describe } = require("mocha");
const { expect } = require("chai");
const supertest = require("supertest")
const app = require('../../..');

const request = supertest(app)


describe('GET /products endpoint testing', () => {

    it("should return message List all products", async () => {
        const res = await request.get('/products?best_seller=true&sortBy=categories')
        expect(res.body.message).to.be.eq('List all products')
    })
    it("should return nextPage page 2", async () => {
        const res = await request.get('/products?page=1')
        expect(res.body.pageInfo.nextPage).to.be.eq(2)
    })
    it("should return prevPage null", async () => {
        const res = await request.get('/products?page=1')
        expect(res.body.pageInfo.prevPage).to.be.null
    })
})



describe('/product/:id endpoint testing', () => {
    it('should should return message detail product', async () => {
        const res = await request.get('/products/1')
        expect(res.body.message).to.be.eq('Detail product')
    })

    // it('should should return message product with id 9999 null', async () => {
    //     const res = await request.get('/products/9999')
    //     expect(res.body.message).to.be.eq(null)
    // })
})
