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
    console.log(movie);

    moviesContainer.innerHTML += `
      <my-movie-card
        onmouseover="movieHoverEffect(event)"
        onmouseleave="movieMouseLeaveEffect(event)"
        isMovie
        image1="${movie.image1}"
        image2="${movie.image2}"
        name="${movie.name}"
        rating="${movie.rating}"
        category="${movie.category}"
      ></my-movie-card>
  `;
  });
};

loadMovies();

window.addEventListener('load', async () => {
  const preload = src => {
    const img = new Image();
    img.src = src;
  };

  const response = await fetch('/data/movies.json');
  const movies = await response.json();

  movies.forEach(movie => {
    preload(`/assets/images/movies/${movie.image2}`);
  });
});
