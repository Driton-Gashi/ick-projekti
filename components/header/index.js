class Header extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    window.openSidebar = () => {
      const overlay = this.querySelector('.OverlayNavSidebar');
      overlay.classList.add('open');
    };
    window.closeSidebar = () => {
      const overlay = this.querySelector('.OverlayNavSidebar');
      overlay.classList.remove('open');
    };

    const isHomepage = window.location.pathname === '/';

    this.innerHTML = `
    <header>
      <div class="logo">
        <a href="/">
          <img src="${isHomepage ? '' : '.'}./assets/images/logo.svg" />
        </a>
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
        <my-icon onClick="openSidebar()" class="burger" iconName="burger"></my-icon>
        <my-icon class="search" iconName="search"></my-icon>
        <my-icon iconName="bell"></my-icon>
        <my-icon iconName="profile"></my-icon>
        <my-icon iconName="sun"></my-icon>
      </div>
    </header>
    <div class="OverlayNavSidebar">
      <div class="NavSidebar">
        <div class="NavSidebarTop">
          <a href="/">
            <img src="./assets/images/logo.svg" />
          </a>
          <my-icon onClick="closeSidebar()" class="closeNavSidebarBtn" iconName="close"></my-icon>
        </div>
        <nav>
          <li><a class="currentPage" href="#">Home</a></li>
          <li><a href="#">Pricing</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">Series</a></li>
          <li><a href="#">Collection</a></li>
          <li><a href="#">FAQ</a></li>
        </nav>
        <div class="NavSidebarIcons">
          <my-icon iconName="bell"></my-icon>
          <my-icon iconName="profile"></my-icon>
          <my-icon iconName="sun"></my-icon>
        </div>
      </div>
    </div>
        `;
  }
}

customElements.define('my-header', Header);
