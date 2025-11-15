const seriesContainer = document.querySelector('.movieList');

const series = [
  {
    image1: 'series_1.png',
    image2: 'series_2.png',
    name: 'Eternal Code',
    rating: 4,
  },
  {
    image1: 'series_2.png',
    image2: 'series_3.png',
    name: 'Hidden Truths',
    rating: 2,
  },
  {
    image1: 'series_3.png',
    image2: 'series_4.png',
    name: 'Neon District',
    rating: 5,
  },
  {
    image1: 'series_4.png',
    image2: 'series_5.png',
    name: 'Lost Signal',
    rating: 3,
  },
  {
    image1: 'series_5.png',
    image2: 'series_6.png',
    name: 'Nightfall Legacy',
    rating: 1,
  },
  {
    image1: 'series_6.png',
    image2: 'series_7.png',
    name: 'Codebreaker',
    rating: 4,
  },
  {
    image1: 'series_7.png',
    image2: 'series_8.png',
    name: 'La casa de papel',
    rating: 5,
  },
  {
    image1: 'series_8.png',
    image2: 'series_9.png',
    name: 'Vikings',
    rating: 5,
  },
  {
    image1: 'series_9.png',
    image2: 'series_1.png',
    name: 'Dexter',
    rating: 5,
  },
  {
    image1: 'series_10.png',
    image2: 'series_1.png',
    name: 'Dexter',
    rating: 5,
  },
];

series.forEach(serie => {
  seriesContainer.innerHTML += `<my-movie-card
  onmouseover="movieHoverEffect(event)"
  onmouseleave="movieMouseLeaveEffect(event)"
  isSerie
  image1="${serie.image1}"
  image2="${serie.image2}"
  rating="${serie.rating}"
  name="${serie.name}"
  ></my-movie-card>
`;
});
