class HaIconButton extends HTMLElement {
  private iconPath = '';

  set path(value: string) {
    this.iconPath = value;
    this.render();
  }

  get path(): string {
    return this.iconPath;
  }

  connectedCallback(): void {
    this.setAttribute('role', 'button');
    this.setAttribute('tabindex', '0');
    this.style.display = 'inline-flex';
    this.style.alignItems = 'center';
    this.style.justifyContent = 'center';
    this.style.width = 'var(--mdc-icon-button-size, 40px)';
    this.style.height = 'var(--mdc-icon-button-size, 40px)';
    this.style.cursor = 'pointer';
    this.render();
  }

  private render(): void {
    this.innerHTML = `
      <svg
        viewBox="0 0 24 24"
        width="var(--mdc-icon-size, 24px)"
        height="var(--mdc-icon-size, 24px)"
        aria-hidden="true"
      >
        <path fill="currentColor" d="${this.iconPath}"></path>
      </svg>
    `;
  }
}

if (!customElements.get('ha-icon-button')) {
  customElements.define('ha-icon-button', HaIconButton);
}
