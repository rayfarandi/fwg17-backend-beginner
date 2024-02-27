
const { describe, it } = require("mocha")
const { expect } = require("chai")

const userController = require('../controllers/admin/user.controller')

const req = {
    query:{}
}

const res = {
    status: (status) => {
        return res
    },json:(param)=>{
        return param
    }
}

describe('list all user',()=>{
    it('should return success true', async()=>{

        const response= await userController.getAllUsers(req,res)
        expect(response.success).to.bee.eq(true)
    })
    it('next should be null', async()=>{
        const req = {
            query:{ page: '7' }
        }
        const response = await userController.getAllUsers(req,res)
        expect(response.pageInfo.nextPage).to.be.eq(null)
    })
    it('prevPage should be null',async()=>{
        const req = {
            query:{ page: '1' }
        }
        const response = await userController.getAllUsers(req,res)
        expect(response.pageInfo.prevPage).to.be.eq(null)
    })
    it('should return no data found',async()=>{
        const req = {
            query:{ searchKey: 'tidak ada' }
        }
        const response = await userController.getAllUsers(req,res)
        console.log(response)
    })
})

