class heroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const title = this.getAttribute('title') ?? 'The Witcher';
    const description =
      this.getAttribute('description') ??
      'Geralt of Rivia, a mutated monster-hunter for hire, journeys toward his destiny in a turbulent world where people often prove more wicked than beasts';

    const image = this.getAttribute('image') ?? 'heroBanner.png';
    const mobileImage =
      this.getAttribute('image-mobile') ?? 'heroBannerMobile.png';

    const finalImage = window.innerWidth <= 1024 ? mobileImage : image;
    const rating = this.getAttribute('rating') ?? 'hero-rating.png';
    const posterImg = this.getAttribute('posterImg') ?? 'FilmsPoster.png';
    this.innerHTML = `
            <div class="hero" style="background: url('/assets/images/heroSection/${finalImage}')">
              <div class="container">
                <div class="heroContent" >
              <h2>${title}</h2>
              <p>
                ${description}
              </p>
              <img src="/assets/images/heroSection/${rating}" draggable="false" />
              <div class="heroBtnWrapper">
                <button>
                  <my-icon iconName="play"></my-icon>
                  Watch Movie
                </button>
                <button>
                  More Info
                  <my-icon iconName="arrowRight"></my-icon>
                </button>
              </div>
            </div>
            <div class="posterWrapper">
              <img src="/assets/images/heroSection/${posterImg}" draggable="false" />
            </div>
              </div>
            </div>
            
        `;
  }
}

customElements.define('my-hero-section', heroSection);
