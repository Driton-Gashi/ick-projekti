class FaqComponent extends HTMLElement {
  async connectedCallback() {
    await this.render();
  }

  async render() {
    const fetchFAQ = async () => {
      try {
        const response = await fetch('/data/faq.json');
        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Something happened while trying to fetch FAQ:', error);
        return [];
      }
    };

    const faq = await fetchFAQ();

    let html = '';
    faq.forEach((faqItem, index) => {
      html += `
          <my-faq-item
            class="faqItem ${index === 0 ? 'open' : ''}"
            question="${faqItem.question}"
            answer="${faqItem.answer}"
          ></my-faq-item>
           `;
    });

    this.innerHTML = html;

    const faqItems = document.querySelectorAll('.faqItem');

    faqItems.forEach(item => {
      item.addEventListener('click', () => {
        item.classList.toggle('open');
        for (let i = 0; i < faqItems.length; i++) {
          if (faqItems[i] === item) continue;
          faqItems[i].classList.remove('open');
        }
      });
    });
  }
}

customElements.define('my-faq-section', FaqComponent);
