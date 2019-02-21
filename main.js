document.getElementById("searchMovieForm").addEventListener("submit", submit);

let apiKey = "";
getKey();

//gets api key from apikey.txt
function getKey() {
  var self = this;
  fetch("apikey.txt")
    .then(res => res.text())
    .then(data => {
      apiKey = data;
      getMoviesData();
    })
    .catch(err => console.log(err));
}

//function to get form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

function getMoviesData() {
  //Get values
  let genre = getInputVal("movieGenre");
  if (genre === "all") {
    genreQuery = ""; //all genres was selected
  } else {
    genreQuery = `with_genres=${genre}`;
  }

  let year = getInputVal("movieYear");
  let yearFromQuery = `primary_release_date.gte=${year}-01-01`;
  let yearToQuery = `primary_release_date.lte=${year}-12-30`;

  let sortBy = getInputVal("movieSortBy");
  let sortByQuery = `sort_by=${sortBy}`;

  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&${sortByQuery}&include_adult=false&include_video=false&page=1&${genreQuery}&${yearFromQuery}&${yearToQuery}`
  )
    .then(res => res.json())
    .then(data => {
      let output = "";
      let imgBasePath = "https://image.tmdb.org/t/p/w300_and_h450_bestv2";
      let movielist = data.results;
      // console.log(movielist);
      movielist.forEach(function(movie) {
        imgFullPath = `${imgBasePath}${movie.poster_path}`;
        output += `
              <div class="card mb-3" style="max-width:400px">
                <img class="card-img-top" src=${imgFullPath}>
                <div class="card-body mb-3">
                  <h5 class="card-title text-primary">${movie.title}</h5>
                  <p class="text-light">${movie.release_date}</p>
                </div>
              </div>
            `;
      });
      document.getElementById("output").innerHTML = output;
    })
    .catch(err => {
      console.log(err);
      document.getElementById("output").innerHTML =
        "An error has ocurred while trying to get the movie information, please check your internet connection and refresh this page";
    });
}

function submit(e) {
  e.preventDefault();
  getMoviesData();
}
