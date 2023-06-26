const request = require("supertest")
const app = require("../app")

const URL_BASE = "/api/v1/directors"

let directorId

test("POST -> 'URL_BASE', should return status code 201", async()=>{
    const director = {
        firstName: "James",
        lastName: "Cameron",
        nationality: "USA",
        image: "http://directorphoto.com",
        birthday: "1970-05-04"
    }

    const res = await request(app)
                .post(URL_BASE)
                .send(director)

    directorId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body.firstName).toBe(director.firstName)
})

test("GET -> 'URL_BASE', should return status code 200", async()=>{
    const res = await request(app)
                .get(URL_BASE)

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("PUT -> 'URL_BASE', should return status code 200 and res.body.name === body.name",
async()=>{

    const body = {
        firstName:"James. L."
    }

    const res = await request(app)
                .put(`${URL_BASE}/${directorId}`)
                .send(body)

    expect(res.status).toBe(200)
    expect(res.body.firstName).toBe(body.firstName)
})

test("DELETE -> 'URL_BASE', should return status code 204", async()=>{
    const res = await request(app)
                .delete(`${URL_BASE}/${directorId}`)

    expect(res.status).toBe(204)
})