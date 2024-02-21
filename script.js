"use strict";

/* Event Listeners */

let fileButton = document.getElementById("moviefile");
let yearsFilter = document.getElementById("movie-year");
let directorFilter = document.getElementById("movie-director");
let orderFilter = document.getElementById("movie-order");
let moviePosters = document.getElementById("movie-posters");
let moviesArray = [];
let newMoviesArray = [];

let movie = function (title, director, releaseDate, 
  imdbRating, posterUrl) {
  this.title = title;
  this.director = director;
  this.releaseDate = releaseDate;
  this.imdbRating = imdbRating;
  this.posterUrl = posterUrl; 
};

function moviesLoaded(json) {
  for(let i = 0; i < json.length; i++){
    let mv = new movie(
      json[i].title,
      json[i].director,
      json[i].releaseDate,
      json[i].imdbRating,
      json[i].posterUrl,
    );
    moviesArray.push(mv);
  };
  displayOriginal();
};

fileButton.addEventListener("change", function () {
  /* Your Code Here */
  let fileInput = event.target.files[0]; 
  var fileReader = new FileReader();

  fileReader.onload = function(e) {
    var content = e.target.result;
    var json = JSON.parse(content).movies;
    moviesLoaded(json); 
  }
  fileReader.readAsText(fileInput);
});

yearsFilter.addEventListener("change", function () {
  directorFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  /* Your Code Here */
  newMoviesArray = [];
  let selectedYear = document.getElementById("movie-year").value;
  for(let i= 0; i < moviesArray.length; i++){
    let movie = moviesArray[i];
    let movieDate = new Date (movie.releaseDate);
    let movieYear = movieDate.getFullYear();
    if(movieYear >= selectedYear){
      newMoviesArray.push(movie);
      displayNew();
    } else if(selectedYear === "All Years") {
      displayOriginal();
    }
  } 
});

directorFilter.addEventListener("change", function () {
  yearsFilter.selectedIndex = 0;
  orderFilter.selectedIndex = 0;
  /* Your Code Here */
  let selectedDirector = document.getElementById("movie-director").value;
  newMoviesArray = [];
  for(let i = 0; i < moviesArray.length; i++){
    let movie = moviesArray[i];
    if(movie.director === selectedDirector){
      newMoviesArray.push(movie);
      displayNew();
    } else if (selectedDirector === "All Directors"){
      displayOriginal();
    }
  }  
});

orderFilter.addEventListener("change", function () {
  directorFilter.selectedIndex = 0;
  yearsFilter.selectedIndex = 0;
  /* Your Code Here */
  newMoviesArray = moviesArray.reverse();
  moviePosters.innerHTML = "";
  displayNew();
});

function displayOriginal(){
  moviePosters.innerHTML = "";
  for(let i = 0; i < moviesArray.length; i++){
    let movieDiv = document.createElement("div");
    movieDiv.className ="movie";
    let moviePosters = document.getElementById("movie-posters");
    let posterImage = document.createElement("img");
    posterImage.src = 'images/' + moviesArray[i].posterUrl;
    movieDiv.appendChild(posterImage);
    moviePosters.appendChild(movieDiv);
  }
};

function displayNew(){
  moviePosters.innerHTML = "";
  for(let i = 0; i < newMoviesArray.length; i++){
    let movieDiv = document.createElement("div");
    movieDiv.className ="movie";
    let posterImage = document.createElement("img");
    posterImage.src = 'images/' + newMoviesArray[i].posterUrl;
    movieDiv.appendChild(posterImage);
    moviePosters.appendChild(movieDiv);
  } 
};