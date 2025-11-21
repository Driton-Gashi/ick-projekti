class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
     <footer>
  <div class="footerLinks">
    <div class="firstRow">
      <a href="#">Get the Omni App <my-icon iconName="chevronRight"></my-icon></a>
      <a href="#">Help <my-icon iconName="chevronRight"></my-icon></a>
      <a href="#">Site Index <my-icon iconName="chevronRight"></my-icon></a>
      <a href="#">Omni Pro <my-icon iconName="chevronRight"></my-icon></a>
      <a href="#">Advertising <my-icon iconName="chevronRight"></my-icon></a>
    </div>

    <div class="secondRow">
      <a href="#">Omni Developer <my-icon iconName="chevronRight"></my-icon></a>
      <a href="#">Jobs <my-icon iconName="chevronRight"></my-icon></a>
      <a href="#">Privacy Policy <my-icon iconName="chevronRight"></my-icon></a>
    </div>
  </div>

  <div class="contactIcons">
    <a href="#" class="contactIcon"><my-icon iconName="facebook"></my-icon></a>
    <a href="#" class="contactIcon"><my-icon iconName="instagram"></my-icon></a>
    <a href="#" class="contactIcon"><my-icon iconName="linkedin"></my-icon></a>
    <a href="#" class="contactIcon"><my-icon iconName="youtube"></my-icon></a>
    <a href="#" class="contactIcon"><my-icon iconName="telegram"></my-icon></a>
  </div>
</footer>

        
    `;
  }
}

customElements.define('my-footer', FooterComponent);
