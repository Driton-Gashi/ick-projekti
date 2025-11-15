window.movieHoverEffect = e => {
  const card = e.currentTarget;
  const isSerie = card.hasAttribute('isSerie');
  const cardType = isSerie ? 'series' : 'movies';

  const image2 = card.getAttribute('image2') || 'movie_2.png';

  const movieCard = card.querySelector('.movieCard');
  movieCard.style.backgroundImage = `url('/assets/images/${cardType}/${image2}')`;
};

window.movieMouseLeaveEffect = e => {
  const card = e.currentTarget;
  const isSerie = card.hasAttribute('isSerie');
  const cardType = isSerie ? 'series' : 'movies';
  const image1 = card.getAttribute('image1') || 'movie_1.png';

  const movieCard = card.querySelector('.movieCard');
  movieCard.style.backgroundImage = `url('/assets/images/${cardType}/${image1}')`;
};

class MovieCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const image1 = this.getAttribute('image1') || 'movie_1.png';
    const isSerie = this.getAttribute('isSerie') !== null;

    const cardType = isSerie ? 'series' : 'movies';

    this.innerHTML = `
      <div class="movieCard" style="background-image: url('/assets/images/${cardType}/${image1}')">
        <div class="plusBtn">
          <my-icon iconName="plus"></my-icon>
        </div>
      </div>
    `;
  }
}

customElements.define('my-movie-card', MovieCard);
