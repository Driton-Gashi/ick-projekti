class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
            <header>
                <div class="logo">
                    <img src="./assets/images/logo.svg" />
                </div>
                <nav>
                    <li><a class="currentPage" href="#">Home</a></li>
                    <li><a href="#">Pricing</a></li>
                    <li><a href="#">Movies</a></li>
                    <li><a href="#">Series</a></li>
                    <li><a href="#">Collection</a></li>
                    <li><a href="#">FAQ</a></li>
                </nav>
                <div class="iconWrapper">
                    <my-icon class="burger" iconName="burger"></my-icon>
                    <my-icon class="search" iconName="search"></my-icon>
                    <my-icon iconName="bell"></my-icon>
                    <my-icon iconName="profile"></my-icon>
                    <my-icon iconName="sun"></my-icon>
                </div>
            </header>
        `;
  }
}

customElements.define('my-header', Header);
