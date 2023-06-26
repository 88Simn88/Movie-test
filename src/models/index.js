const Actor = require("./Actor");
const Director = require("./Director");
const Genre = require("./Genre");
const Movie = require("./Movie");

//Pivot Table  MoviesActors

Movie.belongsToMany(Actor, {through: "MoviesActors"})
Actor.belongsToMany(Movie, {through: "MoviesActors"})

//Pivot Table MoviesGenres

Movie.belongsToMany(Genre, {through: "MoviesGenres"})
Genre.belongsToMany(Movie, {through: "MoviesGenres"})

//Pivot Table MoviesDirectors

Movie.belongsToMany(Director, {through: "MoviesDirectors"})
Director.belongsToMany(Movie, {through: "MoviesDirectors"})