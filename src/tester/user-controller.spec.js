
const { describe, it } = require('mocha')
const { expect } = require('chai')

const userController = require('../controllers/admin/user.controller')

const req = {
    query:{}
}
const res = {
    status: (status)=>{
        return res
    }, json :(params)=>{
        return params
    },
}

describe('list all user',()=>{
    it('should return success true', async()=>{
        const response= await userController.getAllUsers(req,res)
        expect(response.success).to.be.eq(true)
    })
    it('nextPage should be null', async()=>{
        const req = {
            query:{ page: '1' }
        }
        const response = await userController.getAllUsers(req,res)
        expect(response.pageInfo.nextPage).to.be.eq(2)
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
    })
})

describe('detail user',()=>{
    const req={
        params:{id:1}
    }
    const res = {
        status: (status) => {
            return res;
        },
        json: (params) => {
            return params;
        }
    }
    
    it('should return success true',async()=>{
        const response=await userController.getDetailUser(req,res)
        expect(response.success).to.be.eq(true)
    })
    it('user not found',async()=>{
        const req={
            params:{id:10000}
        }
        const response = await userController.getDetailUser(req,res)
        expect(response.success).to.be.eq(false)
        expect(response.message).to.be.eq('user not found')

    })

    it('should return error when an error occurs', async () => {
        const req = {
            params: { id: 'invalidId' } 
        };
        const response = await userController.getDetailUser(req, res);
        expect(response.success).to.be.eq(false);
        expect(response.message).to.be.eq('Internal server error');
    });
})


describe('create user', () => {
    
    it('should return success true', async() => {
        const req = {
            body: {
                fullName: "testing",
                email: "testing9999@mail.com",
                password: "1234",
            }
        }
        const response = await userController.createUser(req, res)
        expect(response.success).to.be.eq(true)
    })


    it('should return message email esting9999@mail.com already registered', async() => {
        const req = {
            body: {
                fullName: "testing",
                email: "testing9999@mail.com",
                password: "1234",
            }
        }
        const response = await userController.createUser(req, res)
        expect(response.message).to.be.eq("testing9999@mail.com already exist")
    })
})

describe('delete user', () => {
    const req = {
        params: {id: 10}
    }

    it('should return success true', async() => {
        const response = await userController.deleteUser(req, res)
        expect(response.success).to.be.eq(true)
    })

    it('should throw not found', async() => {
        const req = {
            params: {id: 10}
        }
        const response = await userController.deleteUser(req, res)
    })
})