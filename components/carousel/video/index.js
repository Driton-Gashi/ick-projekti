const loadVideos = async () => {
  try {
    const response = await fetch('/data/videos.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something happened while trying to fetch videos:', error);
    return [];
  }
};
class MyVideoCarousel extends HTMLElement {
  async connectedCallback() {
    await this.render();
    this.initEmbla();
  }

  disconnectedCallback() {
    if (this._emblaApi) {
      this._emblaApi.destroy();
      this._emblaApi = null;
    }
  }

  async render() {
    const arrows = this.getAttribute('arrows') !== null;
    const dots = this.getAttribute('dots') !== null;

    let carouselItemHTML = '';

    const videos = await loadVideos();

    for (let i = 0; i < videos.length; i++) {
      carouselItemHTML += `
        <div class="embla__slide">
          <div class="embla__slide__number">
            ${videos[i].iframe}
            </div>
        </div>`;
    }

    this.innerHTML = `
      <section class="embla video">
        <div class="embla__viewport">
          <div class="embla__container">
            ${carouselItemHTML}
          </div>
        </div>
        ${
          arrows
            ? `
            <div class="embla__controls">
              <div class="embla__buttons">
                <button class="embla__button embla__button--prev" type="button">
                  <my-icon iconName="chevronLeft"></my-icon>
                </button>
                <button class="embla__button embla__button--next" type="button">
                  <my-icon iconName="chevronRight"></my-icon>
                </button>
              </div>
              ${dots ? '<div class="embla__dots"></div>' : ''}
            </div>
          `
            : ''
        }
      </section>
    `;
  }

  initEmbla() {
    const emblaNode = this.querySelector('.embla');
    if (!emblaNode) return;

    const viewportNode = emblaNode.querySelector('.embla__viewport');

    const OPTIONS = { dragFree: true, loop: true, align: 'start' };

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
      EmblaCarouselAutoplay({ delay: 3000 }),
    ]);

    const autoplay = emblaApi?.plugins()?.autoplay;

    if (autoplay) {
      emblaNode.addEventListener('mouseenter', () => autoplay.stop());
      emblaNode.addEventListener('mouseleave', () => autoplay.play());
    }

    this._emblaApi = emblaApi;
  }
}

customElements.define('my-video-carousel', MyVideoCarousel);
