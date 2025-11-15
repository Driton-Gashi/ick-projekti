class MyVideoCarousel extends HTMLElement {
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

    let carouselItemHTML = '';

    const videos = [
      {
        name: 'Gozilla Minus One',
        iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/nAYKaslCXPc?si=1C8_s1Wvym8k5T30" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      },
      {
        name: 'Killers of the Flower Moon',
        iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/EG0si5bSd6I?si=JHWcQUA_ZeTSuoVf" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      },
      {
        name: 'KUNG FU PANDA 4',
        iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/_inKs4eeHiI?si=-q9h9EbwaXOFGJQD" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      },
      {
        name: 'One Piece',
        iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/Ades3pQbeh8?si=uGR6YO2nc8ldlSgF" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      },
      {
        name: 'Solo Leveling Season 2 -Arise from the Shadow',
        iframe: `<iframe width="560" height="315" src="https://www.youtube.com/embed/byJ7pxxhaDY?si=bIGWvqt0zumCp3X0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`,
      },
    ];

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
    const prevBtnNode = emblaNode.querySelector('.embla__button--prev');
    const nextBtnNode = emblaNode.querySelector('.embla__button--next');
    const dotsNode = emblaNode.querySelector('.embla__dots');

    const OPTIONS = { dragFree: true, loop: true, align: 'start' };

    const emblaApi = EmblaCarousel(viewportNode, OPTIONS, [
      EmblaCarouselAutoplay({ delay: 3000 }),
    ]);

    const autoplay = emblaApi?.plugins()?.autoplay;

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

    if (autoplay) {
      emblaNode.addEventListener('mouseenter', () => autoplay.stop());
      emblaNode.addEventListener('mouseleave', () => autoplay.play());
    }

    this._emblaApi = emblaApi;

    emblaApi.on('destroy', removePrevNext);
    emblaApi.on('destroy', removeDots);
  }
}

customElements.define('my-video-carousel', MyVideoCarousel);
