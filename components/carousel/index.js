document.addEventListener('DOMContentLoaded', function () {
  const OPTIONS = { dragFree: true, loop: true };

  const emblaNode = document.querySelector('.embla');
  if (!emblaNode) return;

  const viewportNode = emblaNode.querySelector('.embla__viewport');
  const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
  const nextBtnNode = emblaNode.querySelector('.embla__button--next');
  const dotsNode = emblaNode.querySelector('.embla__dots');

  // EmblaCarousel and EmblaCarouselAutoplay come from the script tags
  const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
    EmblaCarouselAutoplay({ delay: 4000 }), // you can pass options here, e.g. EmblaCarouselAutoplay({ delay: 4000 })
  ]);

  function addPrevNextBtnsClickHandlers(
    embla,
    prevBtn,
    nextBtn,
    onButtonClick
  ) {
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

    // return cleanup fn like in your original code
    return () => {
      prevBtn.removeEventListener('click', scrollPrev);
      nextBtn.removeEventListener('click', scrollNext);
    };
  }

  function addDotBtnsAndClickHandlers(embla, dotsRoot, onButtonClick) {
    const slidesCount = embla.scrollSnapList().length;
    const dotNodes = [];

    // create dot buttons
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

    const addDotListeners = () => {
      dotNodes.forEach((dotNode, index) => {
        dotNode.addEventListener('click', () => {
          embla.scrollTo(index);
          onButtonClick(embla);
        });
      });
    };

    selectDot();
    addDotListeners();
    embla.on('select', selectDot);

    // return cleanup
    return () => {
      embla.off('select', selectDot);
      dotsRoot.innerHTML = '';
    };
  }

  // ===== same logic as your original code =====
  const onNavButtonClick = emblaApi => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const resetOrStop =
      autoplay.options.stopOnInteraction === false
        ? autoplay.reset
        : autoplay.stop;

    resetOrStop();
  };

  const removePrevNextBtnsClickHandlers = addPrevNextBtnsClickHandlers(
    emblaApi,
    prevBtnNode,
    nextBtnNode,
    onNavButtonClick
  );
  const removeDotBtnsAndClickHandlers = addDotBtnsAndClickHandlers(
    emblaApi,
    dotsNode,
    onNavButtonClick
  );

  emblaApi.on('destroy', removePrevNextBtnsClickHandlers);
  emblaApi.on('destroy', removeDotBtnsAndClickHandlers);
});

class MyCarousel extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const carouselNumber = this.getAttribute('carouselNumber') ?? 6;
    let carouselItemHTML = '';

    for (let i = 0; i < +carouselNumber; i++) {
      carouselItemHTML += `<div class="embla__slide">
            <div class="embla__slide__number">
              <div class="movie" style="background: url(../../assets/images/movies/movie_${
                i + 1
              }.png);">
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
    </section>
        `;
  }
}

customElements.define('my-carousel', MyCarousel);
