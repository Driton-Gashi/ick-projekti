class FaqItem extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const question = this.getAttribute('question') ?? 'What is Omni ?';
    const answer =
      this.getAttribute('answer') ??
      `Lorem ipsum dolor sit amet consectetur adipisicing elit. Sapiente
              facilis minus repellendus et rem quidem accusamus doloribus.
              Dolor, cum ut.`;

    this.innerHTML = `
            <div class="question">
              ${question ? question : ''}
              <my-icon iconName="chevronBottom"></my-icon>
            </div>
            <p class="answer">
              ${answer}
            </p>
        `;
  }
}

customElements.define('my-faq-item', FaqItem);
