const loadSeries = async () => {
  try {
    const response = await fetch('/data/series.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Something happened while trying to fetch series:', error);
    return [];
  }
};

class MySerieCarousel extends HTMLElement {
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
    let carouselItemHTML = '';

    let series = await loadSeries();

    for (let i = 0; i < series.length; i++) {
      carouselItemHTML += `
          <div class="embla__slide">
            <div class="embla__slide__number">
                <my-movie-card 
                name="${series[i].name}" 
                rating=${series[i].rating} 
                onmouseover="movieHoverEffect(event)" 
                onmouseleave="movieMouseLeaveEffect(event)" 
                isSerie 
                image1="${series[i].image1}" 
                image2="${series[i].image2}"
                category="${series[i].category}"
                ></my-movie-card>
            </div>
          </div>`;
    }

    this.innerHTML = `
      <section class="embla">
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

customElements.define('my-serie-carousel', MySerieCarousel);
