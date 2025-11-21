class Studio extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
           <section class="studio">
          <h2>Studios</h2>
          <div class="logoWrapper">
            <img src="/assets/images/studio_logos/amc.png" draggable="false" />
            <img
              src="/assets/images/studio_logos/appleTv+.png"
              draggable="false"
            />
            <img
              src="/assets/images/studio_logos/dcComics.png"
              draggable="false"
            />
            <img
              src="/assets/images/studio_logos/disney+.png"
              draggable="false"
            />
            <img src="/assets/images/studio_logos/HBO.png" draggable="false" />
            <img
              src="/assets/images/studio_logos/marvel.png"
              draggable="false"
            />
            <img
              src="/assets/images/studio_logos/netfilx.png"
              draggable="false"
            />
            <img
              src="/assets/images/studio_logos/paramount.png"
              draggable="false"
            />
            <img src="/assets/images/studio_logos/sony.png" draggable="false" />
            <img
              src="/assets/images/studio_logos/warnerBros.png"
              draggable="false"
            />
          </div>
        </section>
        `;
  }
}

customElements.define('my-studio', Studio);
