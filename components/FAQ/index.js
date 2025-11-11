class FAQ extends HTMLElement {
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

    const open = this.getAttribute('open') !== null ? 'open' : '';
    this.innerHTML = `
            <h2 onclick="openFaq" class="faqItem ${open}">
            <div class="question">
              ${question ? question : ''}
              <my-icon iconName="chevronBottom"></my-icon>
            </div>
            <p class="answer">
              ${answer}
            </p>
          </h2>
        `;
  }
}

customElements.define('my-faq', FAQ);
