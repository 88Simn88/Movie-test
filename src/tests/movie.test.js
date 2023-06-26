const request = require("supertest")
const app = require('../app')
const Actor = require("../models/Actor")
const Director = require("../models/Director")
const Genre = require("../models/Genre")
require("../models")

const URL_BASE = "/api/v1/movies"

let movieId

test("POST -> 'URL_BASE', should return status code 201", async()=>{

    const movie = {
        name: "The Lion King",
        image: "http://lionking.com", 
        synopsis: "This is the story of a lyon",
        releaseYear: 1995
    }

    const res = await request(app)
                .post(URL_BASE)
                .send(movie)

    movieId = res.body.id 

    expect(res.status).toBe(201)
    expect(res.body.name).toBe(movie.name)
})

test("GET -> 'URL_BASE', should return status code 200", async()=>{

    const res = await request(app)
                .get(URL_BASE)

    console.log(res.body)
    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)
})

test("PUT -> 'URL_BASE', should return status code 200", async()=>{

    const body = {
        name: "The Big fish"
    }

    const res = await request(app)
                .put(`${URL_BASE}/${movieId}`)
                .send(body)

    expect(res.status).toBe(200)
    expect(res.body.name).toBe(body.name)
})

test("POST -> 'URL_BASE/:id/actors' set actors movie, should return status code 200 and res.body.length = 1",
async()=>{

    const body = {
            firstName: "Joe",
            lastName: "Black",
            nationality: "Usa",
            image: "http://joeblackimage.com",
            birthday: "1970-05-04"
    }

    const actor = await Actor.create(body)

    const res = await request(app)
         .post(`${URL_BASE}/${movieId}/actors`)
         .send([actor.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    actor.destroy()
})

test("POST -> 'URL_BASE/:id/directors' set directors movie, should return status code 200 and res.body.length = 1",
async()=>{

    const body = {
        firstName: "James",
        lastName: "Cameron",
        nationality: "USA",
        image: "http://directorphoto.com",
        birthday: "1970-05-04"
    }

    const director = await Director.create(body)

    const res = await request(app)
                .post(`${URL_BASE}/${movieId}/directors`)
                .send([director.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    director.destroy()

})

test("POST -> 'URL_BASE/:id/genres' set genres movie, should return status code 200 and res.body.length = 1 ", 
async()=>{

    const body = {
        name: "Fantastic"
    }

    const genre = await Genre.create(body)

    const res = await request(app)
                .post(`${URL_BASE}/${movieId}/genres`)
                .send([genre.id])

    expect(res.status).toBe(200)
    expect(res.body).toHaveLength(1)

    genre.destroy()

})

test("DELETE -> 'URL_BASE' should return status code 204", async()=>{

    const res = await request(app)
                .delete(`${URL_BASE}/${movieId}`)

    expect(res.status).toBe(204)
})