document.addEventListener('DOMContentLoaded', function() {
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('add-button')) {
    const movieID = event.target.dataset.imdbid
    saveToWatchlist(movieID);
  };
});


function saveToWatchlist(movieID) {
  const movie = movieData.find(function (currentMovie) {
    return currentMovie.imdbID == movieID;
  });
  let watchlistJSON = localStorage.getItem('watchlist');
  let watchlist = JSON.parse(watchlistJSON);
  if (watchlist === null) {
     watchlist = [];
     watchlist.push(movie);
     watchlistJSON = JSON.stringify(watchlist);
     localStorage.setItem('watchlist', watchlistJSON);
  } else {
    watchlist.push(movie);
    watchlistJSON = JSON.stringify(watchlist);
    localStorage.setItem('watchlist', watchlistJSON)
  };
};


const myForm = document.getElementById('search-form');
myForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const searchString = document.getElementsByClassName('search-bar').value;
  const urlEncodedSearchString = encodeURIComponent(searchString);
  fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString).then(function(response){
    return response.json().then(function(data){
      document.getElementById('movies-container').innerHTML = renderMovies(data.Search);
      movieData = data.Search;
    });;
  });
  // fetch("http://www.omdbapi.com/?apikey=59354c85&s=" + urlEncodedSearchString).then(function(data){
  //   document.getElementById('movies-container').innerHTML = renderMovies(data.Search);
  // });

  // document.getElementById('movies-container').innerHTML = renderMovies(movieData);
  
  
  function renderMovies(movieArray) {
      let movieHtmlArray = movieArray.map(function(currentMovie) {
          return `<div class="movie">
          <img src="${currentMovie.Poster}"/>
          <div class="flex-container">
            <span class="flex-child title">${currentMovie.Title}</span>
            <span class="flex-child year">${currentMovie.Year}</span>
          </div>
          <button type="button" class="add-button" data-imdbid="${currentMovie.imdbID}">Add</button>
        </div>`
      });
      return movieHtmlArray.join('');
  };
});