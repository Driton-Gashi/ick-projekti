const fetchSeries = async () => {
  try {
    const response = await fetch('/data/series.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something happened while trying to fetch movies:', error);
    return [];
  }
};

const loadSeries = async () => {
  const seriesContainer = document.querySelector('.movieList');

  const series = await fetchSeries();

  series.forEach(serie => {
    seriesContainer.innerHTML += `
  <my-movie-card
  onmouseover="movieHoverEffect(event)"
  onmouseleave="movieMouseLeaveEffect(event)"
  isSerie
  image1="${serie.image1}"
  image2="${serie.image2}"
  rating="${serie.rating}"
  name="${serie.name}"
  category="${serie.category}"
  ></my-movie-card>
`;
  });
};

loadSeries();

window.addEventListener('load', async () => {
  const preload = src => {
    const img = new Image();
    img.src = src;
  };

  const response = await fetch('/data/series.json');
  const series = await response.json();

  series.forEach(serie => {
    preload(`/assets/images/series/${serie.image2}`);
  });
});
