class CustomDrawer extends HTMLElement {
  get open() {
    return this.hasAttribute('open');
  }

  set open(val) {
    val ? this.setAttribute('open', '') : this.removeAttribute('open');
    this.toggle();
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  set disabled(val) {
    val ? this.setAttribute('disabled', '') : this.removeAttribute('disabled');
  }

  constructor() {
    super();
    this.addEventListener('click', () => {
      if (this.disabled) return;
      this.toggle();
    });
  }

  disconnectedCallback() {
    if (!this._target) return;

    this._target.removeEventListener('click', this.toggle);
    this._target = null;
  }

  connectedCallback() {
    if (!this._target) return;

    this._target.addEventListener('click', this.toggle);
  }

  toggle() {
    this.childNodes.forEach((child) => {
      child.hidden = !child.hidden;
    });
  }
}

window.customElements.define('custom-drawer', CustomDrawer);
