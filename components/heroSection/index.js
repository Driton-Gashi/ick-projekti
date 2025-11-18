class heroSection extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <div class="heroContent">
              <h2>The Witcher</h2>
              <p>
                Geralt of Rivia, a mutated monster-hunter for hire, journeys toward
                his destiny in a turbulent world where people often prove more
                wicked than beasts
              </p>
              <img src="/assets/images/hero-rating.png" draggable="false" />
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
              <img src="/assets/images/FilmsPoster.png" draggable="false" />
            </div>
        `;
  }
}

customElements.define('my-hero-section', heroSection);
