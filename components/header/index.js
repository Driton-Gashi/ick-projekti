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

    window.openSearchPopup = () => {
      const overlay = this.querySelector('.searchPopup');
      overlay.classList.add('open');
    };

    window.closeSearchPopup = () => {
      const overlay = this.querySelector('.searchPopup');
      overlay.classList.remove('open');
    };

    const pathName = window.location.pathname;

    this.innerHTML = `
    <header>
      <div class="logo">
        <a href="/">
          <img src="/assets/images/logo.svg" draggable="false"/>
        </a>
      </div>
      <nav>
        <li><a class="${
          pathName === '/' || pathName === '/index.html' ? 'currentPage' : ''
        }" href="/">Home</a></li>
        <li><a href="#">Pricing</a></li>
        <li><a href="#">Movies</a></li>
        <li><a href="#">Series</a></li>
        <li><a href="#">Collection</a></li>
        <li><a href="#">FAQ</a></li>
      </nav>
      <div class="iconWrapper">
        <my-icon onClick="openSidebar()" class="burger" iconName="burger"></my-icon>
        <my-icon onClick="openSearchPopup()" class="search" iconName="search"></my-icon>
        <my-icon iconName="bell"></my-icon>
        <a href="/login">
          <my-icon iconColor="${
            pathName === '/login/' || pathName === '/login/index.html'
              ? 'var(--blue-color)'
              : ''
          }" iconName="profile"></my-icon>
        </a>
        <my-icon iconName="sun"></my-icon>
      </div>
    </header>
    <div class="OverlayNavSidebar">
      <div class="NavSidebar">
        <div class="NavSidebarTop">
          <a href="/">
            <img src="/assets/images/logo.svg" draggable="false"/>
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
          <a href="/login">
            <my-icon iconName="profile"></my-icon>
          </a>
          <my-icon iconName="sun"></my-icon>
        </div>
      </div>
    </div>
    <div class="searchPopup">
      <my-icon onClick="closeSearchPopup()" class="closeSearchPopup" iconName="close"></my-icon>
      <input type="text" placeholder="Search..." class="search" />
    </OverlayNavSidebar>
        `;
  }
}

customElements.define('my-header', Header);
