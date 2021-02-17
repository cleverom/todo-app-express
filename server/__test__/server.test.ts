import supertest from  'supertest';

let app = require('../app')

const request = supertest(app)

describe('checking GET requests', ()=>{
    describe('GET/', ()=>{
        it('should return all data', async ()=>{
            const res = await request.get('/api/data')
                
            expect(res.status).toBe(200)
                })
     })
 })

 describe('checking WRONG GET requests', ()=>{
    describe('GET/', ()=>{
        it('should return RESPONSE 404 FOR all data', async ()=>{
            const res = await request.get('/api/dat')
                
            expect(res.status).toBe(404)
                })

        it('should return RESPONSE 404 FOR single data', async ()=>{
            const res = await request.get('/api/d')
                
            expect(res.status).toBe(404)
       })
     })
 })

describe('Post to Endpoints', () => {

    it('should create a post', async (done) => {
        const res = await request
            .post('/api/data')
            .send({
             "organization": "PWC",
            "products": [
              "developers",
              "UI/design"
              ],
            "marketValue": 80,
            "address": "ikotun",
            "ceo": "clever eziogor",
            "country": "toronto",
            "employees": [
             "james bond",
             "clever-hilton"
            ],
         })
        expect(res.status).toEqual(201)
        done()
     })

     it('should not create a post, return response 404', async (done) => {
        const res = await request
            .post('/api/123')
            .send({
             "organization": "PWC",
            "products": [
              "developers",
              "UI/design"
              ],
            "marketValue": 80,
            "address": "ikotun",
            "ceo": "clever eziogor",
            "country": "toronto",
            "employees": [
             "james bond",
             "clever-hilton"
            ],
         })
        expect(res.status).toEqual(404)
        done()
     })
})
      


     