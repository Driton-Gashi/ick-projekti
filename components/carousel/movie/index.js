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
    if (this._emblaApi) {
      this._emblaApi.destroy();
      this._emblaApi = null;
    }
  }

  render() {
    const arrows = this.getAttribute('arrows') !== null;
    const dots = this.getAttribute('dots') !== null;
    let isMovies = this.getAttribute('isMovies') !== null;
    let isSeries = this.getAttribute('isSeries') !== null;
    if (!isMovies && !isSeries) isMovies = true;

    let carouselItemHTML = '';

    const movies = [
      {
        image1: 'movie_1.png',
        image2: 'movie_2.png',
        name: 'Shadow Rise',
        rating: 5,
      },
      {
        image1: 'movie_2.png',
        image2: 'movie_3.png',
        name: 'Neon Runner',
        rating: 3,
      },
      {
        image1: 'movie_3.png',
        image2: 'movie_4.png',
        name: 'Broken Empire',
        rating: 4,
      },
      {
        image1: 'movie_4.png',
        image2: 'movie_5.png',
        name: 'Silent Echo',
        rating: 2,
      },
      {
        image1: 'movie_5.png',
        image2: 'movie_6.png',
        name: 'Crimson Road',
        rating: 5,
      },
      {
        image1: 'movie_6.png',
        image2: 'movie_7.png',
        name: 'Night Drift',
        rating: 1,
      },
      {
        image1: 'movie_7.png',
        image2: 'movie_8.png',
        name: 'Iron Storm',
        rating: 4,
      },
      {
        image1: 'movie_8.png',
        image2: 'movie_9.png',
        name: 'Lost Memory',
        rating: 5,
      },
      {
        image1: 'movie_9.png',
        image2: 'movie_10.png',
        name: 'Dark Horizon',
        rating: 2,
      },
      {
        image1: 'movie_10.png',
        image2: 'movie_11.png',
        name: 'Phoenix Burn',
        rating: 3,
      },
      {
        image1: 'movie_11.png',
        image2: 'movie_12.png',
        name: 'Moonfall Edge',
        rating: 4,
      },
      {
        image1: 'movie_12.png',
        image2: 'movie_1.png',
        name: 'Final Pulse',
        rating: 1,
      },
    ];

    const series = [
      {
        image1: 'series_1.png',
        image2: 'series_2.png',
        name: 'Eternal Code',
        rating: 4,
      },
      {
        image1: 'series_2.png',
        image2: 'series_3.png',
        name: 'Hidden Truths',
        rating: 2,
      },
      {
        image1: 'series_3.png',
        image2: 'series_4.png',
        name: 'Neon District',
        rating: 5,
      },
      {
        image1: 'series_4.png',
        image2: 'series_5.png',
        name: 'Lost Signal',
        rating: 3,
      },
      {
        image1: 'series_5.png',
        image2: 'series_6.png',
        name: 'Nightfall Legacy',
        rating: 1,
      },
      {
        image1: 'series_6.png',
        image2: 'series_1.png',
        name: 'Codebreaker',
        rating: 4,
      },
    ];

    if (isMovies) {
      for (let i = 0; i < movies.length; i++) {
        carouselItemHTML += `
          <div class="embla__slide">
            <div class="embla__slide__number">
            <my-movie-card 
              name="${movies[i].name}" 
              rating=${movies[i].rating} 
              onmouseover="movieHoverEffect(event)" 
              onmouseleave="movieMouseLeaveEffect(event)" 
              isMovie image1="${movies[i].image1}" 
              image2="${movies[i].image2}"
            ></my-movie-card>
            </div>
          </div>`;
      }
    }

    if (isSeries) {
      for (let i = 0; i < series.length; i++) {
        carouselItemHTML += `
          <div class="embla__slide">
            <div class="embla__slide__number">
              <my-movie-card 
                name="${series[i].name}" 
                rating=${series[i].rating} 
                onmouseover="movieHoverEffect(event)" 
                onmouseleave="movieMouseLeaveEffect(event)" 
                isMovie image1="${series[i].image1}" 
                image2="${series[i].image2}"
              ></my-movie-card>
            </div>
          </div>`;
      }
    }

    this.innerHTML = `
      <section class="embla">
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
    const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
    const nextBtnNode = emblaNode.querySelector('.embla__button--next');
    const dotsNode = emblaNode.querySelector('.embla__dots');

    const OPTIONS = { dragFree: true, loop: true, align: 'start' };

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

    this._emblaApi = emblaApi;

    emblaApi.on('destroy', removePrevNext);
    emblaApi.on('destroy', removeDots);
  }
}

customElements.define('my-movie-carousel', MyCarousel);
