const moviesContainer = document.querySelector('.movieList');

const movies = [
  { image1: 'movie_1.png', image2: 'movie_2.png' },
  { image1: 'movie_2.png', image2: 'movie_3.png' },
  { image1: 'movie_3.png', image2: 'movie_4.png' },
  { image1: 'movie_4.png', image2: 'movie_5.png' },
  { image1: 'movie_5.png', image2: 'movie_6.png' },
  { image1: 'movie_6.png', image2: 'movie_7.png' },
  { image1: 'movie_7.png', image2: 'movie_8.png' },
  { image1: 'movie_8.png', image2: 'movie_9.png' },
  { image1: 'movie_9.png', image2: 'movie_10.png' },
  { image1: 'movie_10.png', image2: 'movie_11.png' },
  { image1: 'movie_11.png', image2: 'movie_12.png' },
  { image1: 'movie_12.png', image2: 'movie_1.png' },
];

movies.forEach(movie => {
  moviesContainer.innerHTML += `<my-movie-card
  onmouseover="movieHoverEffect(event)"
  onmouseleave="movieMouseLeaveEffect(event)"
  isMovie
  image1="${movie.image1}"
  image2="${movie.image2}"
  ></my-movie-card>
`;
});
