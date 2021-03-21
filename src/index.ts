import App from './App';

// Is this necessary?
if (!customElements.get('desktop-control')) {
  customElements.define('desktop-control', App);
}
