const request = require('supertest')
const app = require('../app')

const URL_BASE = '/api/v1/actors'

let actorId

test("POST -> 'URL_BASE' should return status code 201", async()=>{
    
   const body = {
        firstName: "Joe",
        lastName: "Black",
        nationality: "Usa",
        image: "http://joeblackimage.com",
        birthday: "1970-05-04"
    }

    const res = await request(app)
          .post(URL_BASE)
          .send(body)

    actorId = res.body.id

    expect(res.status).toBe(201) 
    expect(res.body.firstName).toBe(body.firstName)
})

test("GET -> 'URL_BASE' should return status code 200", async()=>{
    const res = await request(app)
        .get(URL_BASE)
    
    
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
    
})

test("PUT -> 'URL_BASE', should return status code 200 and res.body.firstName === body.firstName",
async()=>{
    const body = {
        firstName: "Charly"
    }

    const res = await request(app)
            .put(`${URL_BASE}/${actorId}`)
            .send(body)

expect(res.status).toBe(200)
expect(res.body.firstName).toBe(body.firstName)
})

test("DELETE -> 'URL_BASE', should return status code 204", async()=>{
    const res = await request(app).delete(`${URL_BASE}/${actorId}`)

    expect(res.status).toBe(204)
})


