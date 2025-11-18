class Header extends HTMLElement {
  async connectedCallback() {
    await this.render();
  }

  async render() {
    window.openSidebar = () => {
      const overlay = this.querySelector('.OverlayNavSidebar');
      overlay.classList.add('open');
    };

    window.closeSidebar = e => {
      if (
        !(e.target.classList[0] === 'OverlayNavSidebar') &&
        !(e.target.classList[0] === 'closeMenuIcon')
      )
        return;

      const overlay = this.querySelector('.OverlayNavSidebar');
      overlay.classList.remove('open');
    };

    window.openSearchPopup = () => {
      const overlay = this.querySelector('.searchPopup');
      overlay.classList.add('open');
    };

    window.closeSearchPopup = () => {
      const overlay = this.querySelector('.searchPopup');
      const searchInput = document.querySelector('.searchInputWrapper .search');
      searchInput.classList.remove('noRadius');
      overlay.classList.remove('open');
      const popupDropdown = document.querySelector('.searchPopupDropdown');

      while (popupDropdown.firstChild) {
        popupDropdown.removeChild(popupDropdown.firstChild);
      }
      popupDropdown.classList.add('hide');
    };

    window.changeTheme = e => {
      const icon = e.currentTarget;
      icon.getAttribute('iconname') == 'sun'
        ? icon.setAttribute('iconname', 'moon')
        : icon.setAttribute('iconname', 'sun');
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
        }" href="/#top">Home</a></li>
        <li><a href="/#pricing">Pricing</a></li>
        <li><a class="${
          pathName === '/movies/' || pathName === 'movies/index.html'
            ? 'currentPage'
            : ''
        }" href="/movies">Movies</a></li>
        <li><a class="${
          pathName === '/series/' || pathName === 'series/index.html'
            ? 'currentPage'
            : ''
        }" href="/series">Series</a></li>
        <li><a class="${
          pathName === '/collections/' || pathName === 'collections/index.html'
            ? 'currentPage'
            : ''
        }" href="/collections">Collections</a></li>
        <li><a href="/#faq">FAQ</a></li>
      </nav>
      <div class="iconWrapper">
        <my-icon onClick="openSidebar()" class="burger" iconName="burger"></my-icon>
        <my-icon onClick="openSearchPopup()" class="search" iconName="search"></my-icon>
        <my-icon class="buzz-out-on-hover" iconName="bellActive"></my-icon>
        <a href="/register">
          <my-icon iconColor="${
            pathName === '/register/' || pathName === '/register/index.html'
              ? 'var(--blue-color)'
              : ''
          }" iconName="profile"></my-icon>
        </a>
          <my-icon class="sun" onClick="changeTheme(event)" iconName="sun"></my-icon>
      </div>
    </header>
    <div onclick="closeSidebar(event)" class="OverlayNavSidebar">
      <div class="NavSidebar">
        <div class="NavSidebarTop">
          <a href="/">
            <img src="/assets/images/logo.svg" draggable="false"/>
          </a>
          <my-icon onClick="closeSidebar(event)" class="closeNavSidebarBtn" iconName="close"></my-icon>
        </div>
        <nav>
            <li><a class="${
              pathName === '/' || pathName === '/index.html'
                ? 'currentPage'
                : ''
            }" href="/#top">Home</a></li>
          <li><a href="/#pricing">Pricing</a></li>
          <li><a class="${
            pathName === '/movies/' || pathName === 'movies/index.html'
              ? 'currentPage'
              : ''
          }" href="/movies">Movies</a></li>
          <li><a class="${
            pathName === '/series/' || pathName === 'series/index.html'
              ? 'currentPage'
              : ''
          }" href="/series">Series</a></li>
          <li><a class="${
            pathName === '/collections/' ||
            pathName === 'collections/index.html'
              ? 'currentPage'
              : ''
          }" href="/collections">Collections</a></li>
          <li><a href="/#faq">FAQ</a></li>
        </nav>
        <div class="NavSidebarIcons">
          <my-icon class="buzz-out-on-hover" iconName="bellActive"></my-icon>
          <a href="/login">
            <my-icon iconName="profile"></my-icon>
          </a>
          <my-icon class="sun" onClick="changeTheme(event)" iconName="sun"></my-icon>
        </div>
      </div>
    </div>
    <my-search-popup class="searchPopup"></my-search-popup>
        `;
  }
}

customElements.define('my-header', Header);

window.fetchMovies = async () => {
  try {
    const movies = await fetch('/data/movies.json');
    let data = await movies.json();
    return data;
  } catch (error) {
    console.error('Something happened while trying to fetch', error);
    return [];
  }
};
window.fetchSeries = async () => {
  try {
    const series = await fetch('/data/series.json');
    let data = await series.json();
    return data;
  } catch (error) {
    console.error('Something happened while trying to fetch', error);
    return [];
  }
};

window.handleSearch = async () => {
  const allMovies = await fetchMovies();
  const allSeries = await fetchSeries();

  let searchInput = document.querySelector('.searchInputWrapper .search');
  const popupDropdown = document.querySelector('.searchPopupDropdown');
  if (!searchInput.value) return;
  while (popupDropdown.firstChild) {
    popupDropdown.removeChild(popupDropdown.firstChild);
  }

  let filteredMovies = allMovies.filter(item =>
    item.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  let filteredSeries = allSeries.filter(item =>
    item.name.toLowerCase().includes(searchInput.value.toLowerCase())
  );

  if (!filteredMovies && !filteredSeries) return;

  popupDropdown.classList.remove('hide');
  searchInput.classList.add('noRadius');

  filteredMovies.forEach(movie => {
    const item = document.createElement('div');
    item.className = 'searchDropdownMovie';
    item.innerHTML = `<img src="/assets/images/movies/${movie.image1}"/> <h3>${movie.name}</h3>`;
    popupDropdown.appendChild(item);
  });

  filteredSeries.forEach(serie => {
    const item = document.createElement('div');
    item.className = 'searchDropdownMovie';
    item.innerHTML = `<img src="/assets/images/series/${serie.image1}"/> <h3>${serie.name}</h3>`;
    popupDropdown.appendChild(item);
  });

  searchInput.value = '';
};
class SearchPopupComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
                <my-icon
                    onClick="closeSearchPopup()"
                    class="closeSearchPopup"
                    iconName="close"
                ></my-icon>
                <div class="searchInputWrapper">
                  <input type="text" placeholder="Search..." class="search" />
                  <span class="searchButton" onclick="handleSearch()"><my-icon iconname="search" iconColor="var(--dark-color)"></my-icon></span>
                </div>
                 <div class="searchPopupDropdown hide"></div>
        `;
  }
}

customElements.define('my-search-popup', SearchPopupComponent);
