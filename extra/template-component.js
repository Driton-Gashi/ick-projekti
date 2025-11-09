class UserComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const image = this.getAttribute('image');
    this.innerHTML = `
            <link rel='stylesheet' href="../../components/user/index.css"/>
            <div class="userContainer">
                <img src="${image}" alt="User Image" >
                <div class="content">
                    <h3>
                        ${title}
                    </h3>
                    <p>
                        ${description}
                    </p>
                    <a href="#">Read More</a>
                </div>
            </div>
        `;
  }
}

customElements.define('custom-user', UserComponent);
