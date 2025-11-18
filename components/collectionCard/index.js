class CollectionCard extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const collectionName = this.getAttribute('name') ?? 'No Name to show';
    const image1 = this.getAttribute('image1') ?? 'batman.png';
    const image2 = this.getAttribute('image2') ?? 'barbie.png';
    const image3 = this.getAttribute('image3') ?? 'venom.png';

    this.innerHTML = `
      <div class="collectionCard">
      <img class="collectionImage1" src="/assets/images/movies/${image1}"/>
      <img class="collectionImage2" src="/assets/images/movies/${image2}"/>
      <img class="collectionImage3" src="/assets/images/movies/${image3}"/>
        <h3>${collectionName}</h3>
      </div>
    `;
  }
}

customElements.define('my-collection-card', CollectionCard);
