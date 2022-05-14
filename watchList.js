document.addEventListener('DOMContentLoaded', function () {
    let watchList = JSON.parse(localStorage.getItem('watchlist'));

    document.getElementById('movies-container').innerHTML = renderMovies(watchList);

    function renderMovies(movieArray) {
        let movieHtmlArray = movieArray.map(function(currentMovie) {
            return `<div class="movie">
            <img src="${currentMovie.Poster}" alt="theDarkKnight"/>
            <div class="flex-container">
              <span class="flex-child title">${currentMovie.Title}</span>
              <span class="flex-child year">${currentMovie.Year}</span>
            </div>
          </div>`
        });
        return movieHtmlArray.join('');
    };
});