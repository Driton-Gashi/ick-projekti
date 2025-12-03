window.addEventListener('load', async () => {
  const preload = src => {
    const img = new Image();
    img.src = src;
  };

  const response = await fetch('/data/hero-sections.json');
  const data = await response.json();
  const heroCarousel = document.querySelector('.heroCarousel');
  let currentHero = 0;

  setInterval(() => {
    heroCarousel.innerHTML = `
                 <my-hero-section
                   title="${data[currentHero].title}"
                   description="${data[currentHero].description}"
                   image="${data[currentHero].image}"
                   image-mobile="${data[currentHero].imageMobile}"
                   rating="${data[currentHero].rating}"
                   posterImg="${data[currentHero].posterImg}"
                 ></my-hero-section>
               `;

    if (currentHero == data.length - 1) {
      currentHero = 0;
    } else {
      currentHero++;
    }
  }, 5000);

  const response2 = await fetch('/data/movies.json');
  const movies = await response2.json();

  movies.forEach(movie => {
    preload(`/assets/images/movies/${movie.image2}`);
  });
  const response3 = await fetch('/data/series.json');
  const series = await response3.json();

  series.forEach(serie => {
    preload(`/assets/images/series/${serie.image2}`);
  });
});
