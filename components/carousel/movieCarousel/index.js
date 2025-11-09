// helpers can stay outside the class
function addPrevNextBtnsClickHandlers(embla, prevBtn, nextBtn, onButtonClick) {
  if (!prevBtn || !nextBtn) return () => {};
  const scrollPrev = () => {
    embla.scrollPrev();
    onButtonClick(embla);
  };
  const scrollNext = () => {
    embla.scrollNext();
    onButtonClick(embla);
  };

  prevBtn.addEventListener('click', scrollPrev);
  nextBtn.addEventListener('click', scrollNext);

  return () => {
    prevBtn.removeEventListener('click', scrollPrev);
    nextBtn.removeEventListener('click', scrollNext);
  };
}

function addDotBtnsAndClickHandlers(embla, dotsRoot, onButtonClick) {
  if (!dotsRoot) return () => {};
  const slidesCount = embla.scrollSnapList().length;
  const dotNodes = [];

  for (let i = 0; i < slidesCount; i++) {
    const button = document.createElement('button');
    button.className = 'embla__dot';
    button.type = 'button';
    dotsRoot.appendChild(button);
    dotNodes.push(button);
  }

  const selectDot = () => {
    const selectedIndex = embla.selectedScrollSnap();
    dotNodes.forEach((dotNode, index) => {
      dotNode.classList.toggle('is-selected', index === selectedIndex);
    });
  };

  dotNodes.forEach((dotNode, index) => {
    dotNode.addEventListener('click', () => {
      embla.scrollTo(index);
      onButtonClick(embla);
    });
  });

  selectDot();
  embla.on('select', selectDot);

  return () => {
    embla.off('select', selectDot);
    dotsRoot.innerHTML = '';
  };
}

class MyCarousel extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initEmbla();
  }

  disconnectedCallback() {
    // destroy when element is removed
    if (this._emblaApi) {
      this._emblaApi.destroy();
      this._emblaApi = null;
    }
  }

  render() {
    const numberOfItems = this.getAttribute('numberOfItems') ?? 6;
    const controls = this.getAttribute('controls') !== null;
    let isMovies = this.getAttribute('isMovies') !== null;
    const isSeries = this.getAttribute('isSeries') !== null;
    const startFrom = this.getAttribute('startFrom') ?? 1;
    if (!isMovies && !isSeries) isMovies = true;
    const moviesToShow =
      +startFrom + +numberOfItems > 12 ? 12 : +startFrom + +numberOfItems;
    let carouselItemHTML = '';

    for (let i = +startFrom; i <= moviesToShow; i++) {
      carouselItemHTML += `
        <div class="embla__slide">
          <div class="embla__slide__number">
          ${
            isMovies
              ? `<div class="movie" style="background: url(assets/images/movies/movie_${i}.png);">`
              : ''
          }
          ${
            isSeries
              ? `<div class="movie" style="background: url(assets/images/series/series_${i}.png);">`
              : ''
          }
              <div class="plusBtn">
                <my-icon iconName="plus"></my-icon>
              </div>
            </div>
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
        ${
          controls
            ? `
            <div class="embla__controls">
              <div class="embla__buttons">
                <button class="embla__button embla__button--prev" type="button">
                  <svg class="embla__button__svg" viewBox="0 0 532 532">
                    <path
                      fill="white"
                      d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z"
                    ></path>
                  </svg>
                </button>

                <button class="embla__button embla__button--next" type="button">
                  <svg class="embla__button__svg" viewBox="0 0 532 532">
                    <path
                      fill="white"
                      d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z"
                    ></path>
                  </svg>
                </button>
              </div>
              <div class="embla__dots"></div>
            </div>
          `
            : ''
        }
      </section>
    `;
  }

  initEmbla() {
    // scope everything to THIS component
    const emblaNode = this.querySelector('.embla');
    if (!emblaNode) return;

    const viewportNode = emblaNode.querySelector('.embla__viewport');
    const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
    const nextBtnNode = emblaNode.querySelector('.embla__button--next');
    const dotsNode = emblaNode.querySelector('.embla__dots');

    const OPTIONS = { dragFree: true, loop: true };

    // EmblaCarousel and EmblaCarouselAutoplay must already be loaded via <script> before this file
    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
      EmblaCarouselAutoplay({ delay: 2500 }),
    ]);

    const onNavButtonClick = embla => {
      const autoplay = embla?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false
          ? autoplay.reset
          : autoplay.stop;

      resetOrStop();
    };

    const removePrevNext = addPrevNextBtnsClickHandlers(
      emblaApi,
      prevBtnNode,
      nextBtnNode,
      onNavButtonClick
    );
    const removeDots = addDotBtnsAndClickHandlers(
      emblaApi,
      dotsNode,
      onNavButtonClick
    );

    // store so we can destroy later
    this._emblaApi = emblaApi;

    emblaApi.on('destroy', removePrevNext);
    emblaApi.on('destroy', removeDots);
  }
}

customElements.define('my-carousel', MyCarousel);
