document
  .getElementById("searchMovieForm")
  .addEventListener("submit", getMoviesData);

//NOT USED ANYMORE, keeping it just to know the API options...
// let sortbyOptions = [
//   "popularity.asc",
//   "popularity.desc",
//   "release_date.asc",
//   "release_date.desc",
//   "revenue.asc",
//   "revenue.desc",
//   "primary_release_date.asc",
//   "primary_release_date.desc",
//   "original_title.asc",
//   "original_title.desc",
//   "vote_average.asc",
//   "vote_average.desc",
//   "vote_count.asc",
//   "vote_count.desc"
// ];

//function to get form form values
function getInputVal(id) {
  return document.getElementById(id).value;
}

function getMoviesData(e) {
  e.preventDefault();

  //Get values
  let genre = getInputVal("movieGenre");
  let yearFrom = getInputVal("movieYearFrom");
  let yearTo = getInputVal("movieYearTo");
  let sortBy = getInputVal("movieSortBy");
  console.log(`movie genre:${genre}, yearTo:${yearTo}, sortBy:${sortBy}`);

  //TODO: use inputs from form to get data from TMDB
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=891a2d7d763b8e20d78ae746c8986811&language=en-US&sort_by=${sortBy}&include_adult=false&include_video=false&page=1&with_genres=${genre}&primary_release_date.gte=${yearFrom}-01-01&primary_release_date.lte=${yearTo}-01-01`
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
                    <p class="text-secondary">${movie.release_date}</p>
                  </div>
                </div>
              `;
      });
      document.getElementById("output").innerHTML = output;
    });
}
