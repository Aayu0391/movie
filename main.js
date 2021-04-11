$(document).ready(() => {
  $('#searchForm').on('submit', (e) => {
    let searchText = $('#searchText').val();
    getMovies(searchText);
    e.preventDefault();
  });
});

function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?apikey=3fe425a7&s='+searchText)
    .then((response) => {
      console.log(response);
      let movies = response.data.Search;
      let output = '';
      $.each(movies, (index, movie) => {
        output += `
          <div class="hellowo"> <div class="box"> <a onclick="movieSelected('${movie.imdbID}')" href="movie.html" style="text-decoration: none;"><img class="img1" src="${movie.Poster}"> <h4 style="color: #696969; display: flex; justify-content: center; align-items: center;">${movie.Title}</h4></a> </div> </div>
        `;
      });

      $('#movies').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}

function movieSelected(id){
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');

  axios.get("http://www.omdbapi.com/?apikey=3fe425a7&i="+movieId)
    .then((response) => {
      console.log(response);
      let movie = response.data;

      let output =`
        <div class="r">
          <div class="col-1">
            <h2>${movie.Title}</h2>
            <br>
            <h3><strong>Genre: </strong> ${movie.Genre}</h3>
            <h3><strong>Released: </strong> ${movie.Released}</h3>
            <h3><strong>Rated: </strong> ${movie.Rated}</h3>
            <h3><strong>IMDB Rating: </strong> ${movie.imdbRating}</h3>
            <h3><strong>Director(s): </strong> ${movie.Director}</h3>
            <h3><strong>Writers: </strong> ${movie.Writer}</h3>
            <h3><strong>Actors: </strong> ${movie.Actors}</h3>
            <h3><strong>Awards: </strong> ${movie.Awards}</h3>
            <h3><strong>BoxOffice: </strong> ${movie.BoxOffice}</h3>
            <h3><strong>Production: </strong> ${movie.Production}</h3>
            <h3><strong>Runtime: </strong> ${movie.Runtime}</h3>
            <br>
            <h2>PLOT</h2>
            <h3 class="plot">${movie.Plot}</h3>
            <hr>
            <div style="padding-bottom: 30px;"></div>
            <a target="_blank" href="http://imdb.com/title/${movie.imdbID}" class="btn">Go To IMDB Page</a>
          </div>

          <div class="col-2">
            <img class="poster" src="${movie.Poster}">
            <div class="color-box"></div>
          </div>
        </div>
      `;

      $('#movie').html(output);
    })
    .catch((err) => {
      console.log(err);
    });
}