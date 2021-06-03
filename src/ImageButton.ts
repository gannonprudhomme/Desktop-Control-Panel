import {
  css, html, TemplateResult,
} from 'lit-element';
import { ROOT_URL } from './constants';

/**
 * Creates an image button. Isn't a custom element because how LitElement handles shadow-dom's / and
 * prevents us from passing and ID to the img from the host component that's using it.
 * @param onClick Function to be called when the button is pressed
 * @param icon image name
 * @param imgId the id to be applied to the img element
 */
export default function createImageButton(
  onClick: () => void, icon: string, imgId: string,
): TemplateResult {
  const styles = css`
    .image-button {
      border: initial;
      outline: none;
      background-color: initial;
      align-items: initial;
      display: initial;
      box-sizing: initial;
    }

    .image-button:active {
      transform: scale(0.8);
      filter: grayscale(0.8);
    }
  `;

  return html`
    <style>
      ${styles}
    </style>
    <button type="button" @click=${onClick} class="image-button">
      <img src=${`${ROOT_URL}/${icon}`} alt=${imgId} id=${imgId}></img>
    </button> 
  `;
}

/**
 * Creates an image button. Isn't a custom element because how LitElement handles shadow-dom's / and
 * prevents us from passing and ID to the img from the host component that's using it.
 * @param onClick Function to be called when the button is pressed
 * @param iconPath mdi icon path
 * @param imgId the id to be applied to the img element
 */
export function createIconButton(
  onClick: () => void, iconPath: string, imgId: string,
): TemplateResult {
  const styles = css`
    .image-button {
      border: initial;
      outline: none;
      background-color: initial;
      align-items: initial;
      display: initial;
      box-sizing: initial;
    }

    .image-button:active {
      transform: scale(0.8);
      filter: grayscale(0.8);
    }
  `;

  return html`
    <style>
      ${styles}
    </style>
    <button type="button" @click=${onClick} class="image-button">
      <ha-svg-icon .path=${iconPath} class=${imgId}></ha-svg-icon>
    </button> 
  `;
}
