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

class MyFilterCarousel extends HTMLElement {
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
    let carouselItemHTML = '';
    const arrows = this.getAttribute('arrows') !== null;
    const dots = this.getAttribute('dots') !== null;

    window.filterBtn = e => {
      e.target.classList.toggle('checked');
    };

    const movieCategories = [
      'Action',
      'Adventure',
      'Drama',
      'Comedy',
      'Romance',
      'Thriller',
      'Horror',
      'Fantasy',
      'Mystery',
      'Animation',
      'Documentary',
      'Crime',
      'Family',
      'Musical',
    ];

    for (let i = 0; i < movieCategories.length; i++) {
      carouselItemHTML += `
        <div class="embla__slide">
          <div class="embla__slide__number">
            <button onclick="filterBtn(event)" class="filterBtn" >${movieCategories[i]}</button>
          </div>
        </div>`;
    }

    this.innerHTML = `
       <section class="embla filter">
        <div class="embla__viewport">
          <div class="embla__container">
            ${carouselItemHTML}
          </div>
        </div>      
       ${
         arrows
           ? ` <button class="embla__button embla__button--prev" type="button">
                  <my-icon iconName="chevronLeft"></my-icon>
                </button>

                <button class="embla__button embla__button--next" type="button">
                  <my-icon iconName="chevronRight"></my-icon>
                </button>`
           : ''
       }
       ${dots ? `<div class="embla__dots"></div>` : ''}
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
      EmblaCarouselAutoplay({ delay: 2000 }),
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

customElements.define('my-filter-carousel', MyFilterCarousel);
