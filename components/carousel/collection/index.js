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
    console.log(collections);

    let carouselItemHTML = '';

    for (let i = 0; i < collections.length; i++) {
      carouselItemHTML += `
        <div class="embla__slide">
          <div class="embla__slide__number">
            <my-collection-card
              image1="${collections[i].image1}"
              image2="${collections[i].image2}"
              image3="${collections[i].image3}"
              name="${collections[i].name}"
            ></my-collection-card>
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
