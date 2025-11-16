const fetchMovies = async () => {
  try {
    const response = await fetch('/data/movies.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something happened while trying to fetch movies:', error);
    return [];
  }
};

const loadMovies = async () => {
  const moviesContainer = document.querySelector('.movieList');

  const movies = await fetchMovies();

  movies.forEach(movie => {
    moviesContainer.innerHTML += `
      <my-movie-card
        onmouseover="movieHoverEffect(event)"
        onmouseleave="movieMouseLeaveEffect(event)"
        isMovie
        image1="${movie.image1}"
        image2="${movie.image2}"
      ></my-movie-card>
  `;
  });
};

loadMovies();
