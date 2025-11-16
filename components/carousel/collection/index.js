const loadCollections = async () => {
  try {
    const response = await fetch('/data/collections.json');
    if (!response.ok) throw new Error('Failed to load collections');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      'Something happened while trying to fetch collections:',
      error
    );
    return [];
  }
};
class MyCollectionCarousel extends HTMLElement {
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
    const collections = await loadCollections();

    let carouselItemHTML = '';

    for (let i = 0; i < collections.length; i++) {
      carouselItemHTML += `
        <div class="embla__slide">
          <div class="embla__slide__number">
            <div class="movie" style="background: url(/assets/images/collections/${collections[i].image});">
              <h3>${collections[i].name}</h3>
            </div>
          </div>
        </div>`;
    }

    this.innerHTML = `
      <section class="embla collection">
        <div class="embla__viewport">
          <div class="embla__container">
            ${carouselItemHTML}
          </div>
        </div>
      </section>
    `;
  }

  initEmbla() {
    const emblaNode = this.querySelector('.embla');
    if (!emblaNode) return;

    const viewportNode = emblaNode.querySelector('.embla__viewport');

    const OPTIONS = { dragFree: true, loop: true, align: 'start' };

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
      EmblaCarouselAutoplay({ delay: 2500 }),
    ]);

    const autoplay = emblaApi?.plugins()?.autoplay;

    if (autoplay) {
      emblaNode.addEventListener('mouseenter', () => autoplay.stop());
      emblaNode.addEventListener('mouseleave', () => autoplay.play());
    }

    this._emblaApi = emblaApi;
  }
}

customElements.define('my-collection-carousel', MyCollectionCarousel);
