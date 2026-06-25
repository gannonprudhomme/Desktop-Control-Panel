import webAwesomeStyles from '@awesome.me/webawesome/dist/styles/themes/default.css?inline';
import '@awesome.me/webawesome/dist/components/button/button.js';
import '@awesome.me/webawesome/dist/components/button-group/button-group.js';
import '@awesome.me/webawesome/dist/components/card/card.js';
import '@awesome.me/webawesome/dist/components/slider/slider.js';

if (!document.head.querySelector('style[data-web-awesome]')) {
  const style = document.createElement('style');
  style.dataset.webAwesome = 'true';
  style.textContent = webAwesomeStyles;
  document.head.appendChild(style);
}
