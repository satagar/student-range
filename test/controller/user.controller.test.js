const {sigup,login,filter,update ,deletes } = require('../../controllers/user.controller');
const {connectDB,clearDB,closeDB} = require('../db')
const {mockRequest,mockResponse} = require('../interceptor')
const bcrypt = require('bcrypt')
const userModel = require('../../models/user.model')
//-----------------------------user data payload
const userPayload = {
    "userId": "1",
    "name": "test",
    "email": "test@gmail.com",
    "password": "test",
    "city": "mau",
    "country": "india",
    "state": "up",
    "location": {
        "type": "Point",
        "coordinates": [25.9397307, 83.527602]
    }
}
//------------------------- Virtual database operation
beforeAll(async () => connectDB())
beforeEach(async () => clearDB());
afterAll(async () => closeDB())
//----------------------- signup test
describe('test user controller',()=>{
    it('user signup should pass',async ()=>{
        //arrane
         const req = mockRequest()
         const res = mockResponse();
         req.body = userPayload;

        //act
         await sigup(req,res);
        //asserts
        expect(res.status).toHaveBeenCalledWith(201);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Signup successfully!"
            })
        )
    })
    it('user signup should fail',async ()=>{
        //arrane
         const req = mockRequest()
         const res = mockResponse();
         req.body = userPayload;
        const userSpy = jest.spyOn(userModel,'create').mockReturnValue(Promise.reject('error occuring'))
        //act
         await sigup(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled()
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Internal server error!"
            })
        )
    })
    it('user signup should fail due to name field missing',async ()=>{
        //arrane
         const req = mockRequest()
         const res = mockResponse();
         userPayload.name = null;
         req.body = userPayload;
        //act
         await sigup(req,res);
        //asserts
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Please Provide name , email , password ,location!"
            })
        )
    })
    it('user signup should fail due to email field missing',async ()=>{
        //arrane
         const req = mockRequest()
         const res = mockResponse();
         userPayload.email = null;
         req.body = userPayload;
        //act
         await sigup(req,res);
        //asserts
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Please Provide name , email , password ,location!"
            })
        )
    })
    it('user signup should fail due to password field missing',async ()=>{
        //arrane
         const req = mockRequest()
         const res = mockResponse();
         userPayload.password = null;
         req.body = userPayload;
        //act
         await sigup(req,res);
        //asserts
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Please Provide name , email , password ,location!"
            })
        )
    })
    it('user signup should fail due to location field missing',async ()=>{
        //arrane
         const req = mockRequest()
         const res = mockResponse();
         userPayload.location = null;
         req.body = userPayload;
        //act
         await sigup(req,res);
        //asserts
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Please Provide name , email , password ,location!"
            })
        )
    })
})
//----------------------- login test
describe('test user login controller ',()=>{
    it('user login should pass',async ()=>{
        //arrange
        const res = mockResponse();
        const req = mockRequest();
        req.body = {
            "email":"test",
            "password":"test"
        }
        const userSpy = jest.spyOn(userModel,'findOne').mockReturnValue(Promise.resolve(userPayload))
        const bcryptSpy = jest.spyOn(bcrypt,'compareSync').mockReturnValue(true);

        //act
        await login(req,res)
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(bcryptSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "login successfully",
                userId: userPayload.userId
            })
        )
    })
    it('user login should fail due to internal error',async ()=>{
        //arrange
        const res = mockResponse();
        const req = mockRequest();
        req.body = {
            "email":"test",
            "password":"test"
        }
        const userSpy = jest.spyOn(userModel,'findOne').mockReturnValue(Promise.reject("error occuring"))
        //act
        await login(req,res)
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Internal server error!"
            })
        )
    })
    it('user login should fail due to invalid password',async ()=>{
        //arrange
        const res = mockResponse();
        const req = mockRequest();
        req.body = {
            "email":"test",
            "password":"test"
        }
        const userSpy = jest.spyOn(userModel,'findOne').mockReturnValue(Promise.resolve(userPayload))
        const bcryptSpy = jest.spyOn(bcrypt,'compareSync').mockReturnValue(false);

        //act
        await login(req,res)
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(bcryptSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(401)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "login failed due to invalied password"
            })
        )
    })
    it('user login should fail due to user not found!',async ()=>{
        //arrange
        const res = mockResponse();
        const req = mockRequest();
        req.body = {
            "email":"test",
            "password":"test"
        }
        const userSpy = jest.spyOn(userModel,'findOne').mockReturnValue(Promise.resolve(null))
        //act
        await login(req,res)
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "user does not exists!"
            })
        )
    })
})
//-----------------------------user filter
const userPayload2 =  {
    "userId": "1",
    "name": "test",
    "email": "test@gmail.com",
    "password": "test",
    "city": "mau",
    "country": "india",
    "state": "up",
    "location": {
        "type": "Point",
        "coordinates": [25.9397307, 83.527602]
    },
    "save":jest.fn()
}
describe('test user filter controller',()=>{
    it('test find all user should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        const userSpy = jest.spyOn(userModel,'find').mockReturnValue(Promise.resolve([userPayload2]))
        //act
        await filter(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                users:expect.arrayContaining([
                    expect.objectContaining({
                            "userId": "1",
                            "name": "test",
                            "email": "test@gmail.com",
                            "password": "test",
                            "city": "mau",
                            "country": "india",
                            "state": "up",
                            "location": {
                                "type": "Point",
                                "coordinates": [25.9397307, 83.527602]
                        }
                    })
                ])
            })
        )
    })
    it('test find all user should fail due to internal error',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        const userSpy = jest.spyOn(userModel,'find').mockReturnValue(Promise.reject('error occuring!'))
        //act
        await filter(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "internal server error!"
            })
        )
    })
    it('test find all user should pass with id',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        const userSpy = jest.spyOn(userModel,'find').mockReturnValue(Promise.resolve([userPayload2]))
        //act
        req.query = {id:1}
        await filter(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                users:expect.arrayContaining([
                    expect.objectContaining({
                            "userId": "1",
                            "name": "test",
                            "email": "test@gmail.com",
                            "password": "test",
                            "city": "mau",
                            "country": "india",
                            "state": "up",
                            "location": {
                                "type": "Point",
                                "coordinates": [25.9397307, 83.527602]
                        }
                    })
                ])
            })
        )
    })
    it('test find all user should pass with name',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        const userSpy = jest.spyOn(userModel,'find').mockReturnValue(Promise.resolve([userPayload2]))
        //act
        req.query = {name:test}
        await filter(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                users:expect.arrayContaining([
                    expect.objectContaining({
                            "userId": "1",
                            "name": "test",
                            "email": "test@gmail.com",
                            "password": "test",
                            "city": "mau",
                            "country": "india",
                            "state": "up",
                            "location": {
                                "type": "Point",
                                "coordinates": [25.9397307, 83.527602]
                        }
                    })
                ])
            })
        )
    })
    it('test find all user should pass with latitude and longitude',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        const userSpy = jest.spyOn(userModel,'find').mockReturnValue(Promise.resolve([userPayload2]))
        //act
        req.query = {
            latitude:25.9397307,
            longitude:83.527602
        }
        await filter(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                users:expect.arrayContaining([
                    expect.objectContaining({
                            "userId": "1",
                            "name": "test",
                            "email": "test@gmail.com",
                            "password": "test",
                            "city": "mau",
                            "country": "india",
                            "state": "up",
                            "location": {
                                "type": "Point",
                                "coordinates": [25.9397307, 83.527602]
                        }
                    })
                ])
            })
        )
    })
})
describe('test user update controller',()=>{
    it('user update should pass',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.userId = 1;
        req.body = {
            name:"user5",
            city:"singapur",
            country:"singapur",
            state:"UBS",
            location: {
                "type": "Point",
                "coordinates": [25.9397307, 83.527602]
            }
        }
        const userSpy = jest.spyOn(userModel,'findOne').mockReturnValue(Promise.resolve(userPayload2))
        //act
        await update(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(201)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "user update successfully!"
            })
        )
    })
    it('user update should fail',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.userId = 1;
        req.body = {
            name:"user5"
        }
        const userSpy = jest.spyOn(userModel,'findOne').mockReturnValue(Promise.reject('error occuring!'))
        //act
        await update(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Internal server error!"
            })
        )
    })
})
describe('test user delete controller',()=>{
    it('user delete should pass',async ()=>{
           //arrange
           const req = mockRequest();
           const res = mockResponse();
           req.userId = 1;
           const userSpy = jest.spyOn(userModel,'findOneAndDelete').mockReturnValue(Promise.resolve(userPayload2))
           //act
           await deletes(req,res);
           //asserts
           expect(userSpy).toHaveBeenCalled();
           expect(res.status).toHaveBeenCalledWith(201)
           expect(res.send).toHaveBeenCalledWith(
               expect.objectContaining({
                message: "user delete successfully!",
                deleted_User: expect.objectContaining( {
                    "userId": "1",
                    "name": "user5",
                    "email": "test@gmail.com",
                    "password": "test",
                    "city": "singapur",
                    "country": "singapur",
                    "state": "UBS",
                    "location": {
                        "type": "Point",
                        "coordinates": [25.9397307, 83.527602]
                    },
                })
               })
           )
    })
    it('user delete should fail',async ()=>{
        //arrange
        const req = mockRequest();
        const res = mockResponse();
        req.userId = 1;
        const userSpy = jest.spyOn(userModel,'findOneAndDelete').mockReturnValue(Promise.reject('error occuring!'))
        //act
        await deletes(req,res);
        //asserts
        expect(userSpy).toHaveBeenCalled();
        
        expect(res.status).toHaveBeenCalledWith(500)
        expect(res.send).toHaveBeenCalledWith(
            expect.objectContaining({
                message: "Internal server error!"
            })
        )
 })
})
