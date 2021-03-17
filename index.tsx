import register from 'preact-custom-element';
import App from './components/App';

register(App, 'desktop-control', ['hass', 'narrow', 'route', 'panel']);
