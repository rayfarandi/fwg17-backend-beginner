const { describe, it } = require("mocha")
const { expect } = require("chai")


const authController = require('../controllers/auth.controller');

const res = {
    status: (status) => {
        return res
    },
    json: (param) => {
        return param
    },
}

describe("register", () => {
    const req = {
        body: {fullName: "testing",
            email: `testing123@mail.com`,
            password: "1234"}
    }
    it("should return success true", async () => {
        const response = await authController.register(req, res)
        expect(response.success).to.be.eq(true)
    })

    it('should return message email mikaina@mail.com already registered', async() => {
        const req = {
            body: {fullName: "mikaina",
                email: "mikaina@mail.com",
                password: "123",}
        }
        const response = await authController.register(req, res)
        expect(response.message).to.be.eq("email mikaina@mail.com already registered")
    })
})


describe('login', () => {
    it("should return success true", async () => {
        const req = {
            body: {email: "mikaina@mail.com",
                password: "1234"}
        }
        const response = await authController.login(req, res)
        expect(response.success).to.be.eq(true)
    })

    it("should return message enter your email", async () => {
        const req = {
            body: {password: "123"}
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("enter your email")
    })


    it("should return message email not registered, create new account", async () => {
        const req = {
            body: {
                email: "mikaina@mail.comggggg",
                password: "1234"
            }
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("email not registered, create new account")
    })


    it("should return message enter your password", async () => {
        const req = {
            body: {email: "mikaina@mail.com"}
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("enter your password")
    })


    it("should return message wrong password, try again", async () => {
        const req = {
            body: {email: "mikaina@mail.com",
                password: "1234567890"}
        }
        const response = await authController.login(req, res)
        expect(response.message).to.be.eq("wrong password, try again")
    })
})