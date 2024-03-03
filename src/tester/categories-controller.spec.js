const { describe } = require("mocha");
const { expect } = require("chai");

const categoriesController = require('../controllers/admin/categorie.controller');

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


describe("List all categories", () => {
    it("should return message List all categories", async () => {
        const response = await categoriesController.getAllCategories(req, res)
        expect(response.success).to.be.eq(true)
    })

    it("should return message data categories not found", async () => {
        const req = {
            query: {
                searchKey: "fx"
            },
        }
        const response = await categoriesController.getAllCategories(req, res)
    })



    it("should return nextPage null", async () => {
        const req = {
            query: {page: 2},
        }
        const response = await categoriesController.getAllCategories(req, res)
        expect(response.pageInfo.nextPage).to.be.eq(null)
    })



    it("should return prevPage null", async () => {
        const req = {
            query: {page: 1},
        }
        const response = await categoriesController.getAllCategories(req, res)
        expect(response.pageInfo.prevPage).to.be.eq(null)
    })

    it('should return message column fx does not exist', async() => {
        const req = {
            query: {sortBy: 'fx'}
        }
        const response = await categoriesController.getAllCategories(req, res)
        expect(response.message).to.be.eq('column fx does not exist')
    })
})






describe("detail category", () => {
    it("should return message detail category", async () => {
        const req = {
            params: {id: "2"},
        }
        const response = await categoriesController.getDetailCategory(req, res)
        expect(response.success).to.be.eq(true)
    })



    it('should return message invalid input syntax for type integer: fx', async() => {
        const req = {
          params: {id: "fx"},
        }
        const response = await categoriesController.getDetailCategory(req, res)
        expect(response.message).to.be.eq("invalid input syntax for type integer: NaN")
    })



    it("should return message category with id 999 not found", async () => {
        const req = {
          params: {id: "999"},
        }
        
        const response = await categoriesController.getDetailCategory(req, res)
        expect(response.message).to.be.eq("category with id 999 not found ")
    })
})




describe("create category", () => {
    it("should return message create category successfully", async () => {
        const req = {
          body: {
            name: new Date().getTime(),
          },
        };

        const response = await categoriesController.createCategory(req, res)
        expect(response.success).to.be.eq(true)
    })


    it("should return message name Non Coffee already exist", async () => {
        const req = {
            body: {name: "Non Coffee"}
        }

        const response = await categoriesController.createCategory(req, res)
        expect(response.message).to.be.eq("categories with name Non Coffee already exist")
    })

})




describe("update category", () => {
    it("should return message update category successfully", async () => {
        const req ={
            params: {
                id: "6"
            },
            body: {
                name: new Date().getTime()
            }
        }

        const response = await categoriesController.updateCategory(req, res)
        expect(response.message).to.be.eq("update category successfully")
    })



    it("should return message column nyarikolom of relation categories does not exist", async () => {
        const req ={
            params: {
                id: "3"
            },
            body: {
                nyarikolom: "test"
            }
        }

        const response = await categoriesController.updateCategory(req, res)
        expect(response.message).to.be.eq("column nyarikolom of relation categories does not exist")
    })
    


    it("should return message categories with name Non Coffee already exist", async () => {
        const req ={
            params: {
                id: "3"
            },
            body: {
                name: "Non Coffee"
            }
        }

        const response = await categoriesController.updateCategory(req, res)
        expect(response.message).to.be.eq("categories with name Non Coffee already exist")
    })
    

    it("should return message data with id 9999 not found", async () => {
        const req = {
          params: {id: "9999"},
          body: {name: "9999"},
        }

        const response = await categoriesController.updateCategory(req, res)
        expect(response.message).to.be.eq("data with id 9999 not found")
    })

})





describe('delete category', () => {
    it("should return message delete category successfully", async () => {
        const req ={
            params: {
                id: "88"
            }
        }

        const response = await categoriesController.deleteCategory(req, res)
        expect(response.message).to.be.eq("delete category successfully")
    })



    it('should return message invalid input', async() => {
        const req = {
            params: {
                id: "fx"
            }
        }

        const response = await categoriesController.deleteCategory(req, res)
        expect(response.message).to.be.eq("invalid input")
    })
 

    it("should return message data with id 9999 not found", async () => {
        const req = {
          params: {
            id: "9999",
          },
        };
          

        const response = await categoriesController.deleteCategory(req, res)
        expect(response.message).to.be.eq("data with id 9999 not found")
    })
})