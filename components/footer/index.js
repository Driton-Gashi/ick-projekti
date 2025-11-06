class Footer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute('image');

    this.innerHTML = `
            <footer style="background: #000">
                <div class="footerTop">
                    <ul>
                    <li><a href="#">Get the Omni App</a></li>
                    <li><a href="#">Get the Omni App</a></li>
                    <li><a href="#">Get the Omni App</a></li>
                    <li><a href="#">Get the Omni App</a></li>
                    </ul>
                </div>
                <div class="footerBottom">
                    <my-icon iconName="facebook"></my-icon>
                    <my-icon iconName="facebook"></my-icon>
                    <my-icon iconName="facebook"></my-icon>
                </div>
            </footer>
        `;
  }
}

customElements.define('footer-component', Footer);
