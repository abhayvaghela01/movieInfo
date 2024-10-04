const searchForm = document.querySelector('form');
const movieContainer = document.querySelector('.movie-container');
const inputBox = document.querySelector('.inputBox');
// const moviePoster = document.querySelector('.movie-poster');
// const movieDetails = document.querySelector('.movie-details');


// fun to fetch movie details using OMDB API
const getMovieInfo = async (movie) => {
    try {
        const myAPIKey = 'b1731823';
        const url = `https://www.omdbapi.com/?apikey=${myAPIKey}&t=${movie}`;

        const response = await fetch(url);

        if(!response.ok) {
            throw new Error("Unable To Fetch Movie Data")
        }
        const data = await response.json();

        console.log(data);
        showMovieData(data); 

    } catch (error) {
            showErrorMessage("NO Movie Found!!");
    }
}

// fun to show movie data on screen 
const showMovieData = (data) => {

    movieContainer.innerHTML = "";
    movieContainer.classList.remove('noBackground');
    const { Title, imdbRating, Genre, Released, Runtime, Actors, Plot, Poster} = data;

    const movieElement = document.createElement('div');
    movieElement.classList.add('movie-info');

    movieElement.innerHTML = `<h2>${Title}</h2>
                              <p><strong>Rating: &#11088;</strong>${imdbRating}</p>`;

    const movieGenreElement = document.createElement('div');  
    movieGenreElement.classList.add('movie-genre');

    Genre.split(",").forEach(element => {
        const p = document.createElement('p');
        p.innerText = element;
        movieGenreElement.appendChild(p);
    });

    movieElement.appendChild(movieGenreElement);

    movieElement.innerHTML +=  `<p><strong>Released Date: <strong>${Released}</p>
                                <p><strong>Duration: </strong>${Runtime}</p>
                                <p><strong>Cast: </strong>${Actors}</p>
                                <p><strong>Plot: </strong>${Plot}</p>`;
    
    // creating a div for movie poster 
    const moviePosterElement = document.createElement('div');
    moviePosterElement.classList.add('movie-poster');
    moviePosterElement.innerHTML = `<img src="${Poster}"/>`
    
    movieContainer.appendChild(moviePosterElement); 
    movieContainer.appendChild(movieElement);                          
                        
}


const showErrorMessage = (message) => {
    movieContainer.innerHTML = `<h2>${message}</h2>`
    movieContainer.classList.add('noBackground');
}
 

// fun to hundle form submission 
const handleFormSubmission = (e) => {
    e.preventDefault();
    const movieName = inputBox.value.trim();
    if(movieName !== ''){
        showErrorMessage("Fetching Movie Information...");
        getMovieInfo(movieName);
    }
    else{
        showErrorMessage("Enter movie name to get movie information")
    }
}

//adding evnet listener to search form
searchForm.addEventListener('submit', handleFormSubmission);
   




// searchForm.addEventListener('submit', (e) => {
//     e.preventDefault();
//     const movieName = inputBox.value.trim();
//     if(movieName !== ''){
//         getMovieInfo(movieName);
//     }
//     if (e.key === 'Enter') {
//         getMovieInfo(searchForm.value)
//     }
// });

// searchBtn.addEventListener('click',() => {
//     getMovieInfo(searchForm.value);
// });
