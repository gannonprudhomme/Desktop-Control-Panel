import webAwesomeStyles from '@awesome.me/webawesome/dist/styles/themes/default.css?inline';

if (!document.head.querySelector('style[data-web-awesome]')) {
  const style = document.createElement('style');
  style.dataset.webAwesome = 'true';
  style.textContent = webAwesomeStyles;
  document.head.appendChild(style);
}

const webAwesomeWindow = window as Window & {
  dcpWebAwesomeReady?: Promise<void>;
};

webAwesomeWindow.dcpWebAwesomeReady ??= (async () => {
  if (!customElements.get('wa-button')) {
    await import('@awesome.me/webawesome/dist/components/button/button.js');
  }

  if (!customElements.get('wa-button-group')) {
    await import('@awesome.me/webawesome/dist/components/button-group/button-group.js');
  }

  if (!customElements.get('wa-card')) {
    await import('@awesome.me/webawesome/dist/components/card/card.js');
  }

  if (!customElements.get('wa-slider')) {
    await import('@awesome.me/webawesome/dist/components/slider/slider.js');
  }
})();
