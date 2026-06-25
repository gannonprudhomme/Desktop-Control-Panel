import {
  css, html, TemplateResult,
} from 'lit-element';

// Reference: https://stackoverflow.com/a/61453050/
/**
 * Creates a slider
 * @param onSlide Function to be updated on every slide update
 * @param onChange Function that's called only when the user is done sliding
 * @param startVal The start value of the slider
 * @param min Minimum value of the slider
 * @param max Maximum value of the slider
 * @param additionalClass Additional class to add to the slider container. Namely used
 *  for changing the track color of the slider (e.g. for the temperature slider)
 * @returns TemplateResult (html) of the slider
 */
export default function createSlider(
  onSlide: (value: number) => void, onChange: (value: number) => void, startVal: number, min = 0,
  max = 100, additionalClass: string = null,
): TemplateResult {
  const callOnSlider = (event: Event) => {
    const value = Number((event.target as HTMLElement & { value: number }).value);

    if (onSlide) {
      onSlide(value);
    }
  };

  const callOnChange = (event: Event) => {
    const value = Number((event.target as HTMLElement & { value: number }).value);

    if (onChange) {
      onChange(value);
    }
  };

  // https://stackoverflow.com/a/58095358/
  const styles = css`
    .slider {
      --track-size: 9px;
      --thumb-width: 30px;
      --thumb-height: 30px;
      display: block;
      height: 184px;
      color: var(--dcp-accent);
    }

    .slider::part(track) {
      height: 174px;
      background: rgba(255, 255, 255, 0.1);
    }

    .slider::part(thumb) {
      border: 3px solid var(--dcp-surface);
      box-shadow: 0 3px 12px rgba(0, 0, 0, 0.32);
    }

    .temperature-slider-container::part(track) {
      background: linear-gradient(
        to top,
        rgb(255, 151, 53),
        rgb(255, 239, 210) 50%,
        rgb(130, 198, 255)
      );
    }

    .temperature-slider-container::part(indicator) {
      background: rgba(255, 255, 255, 0.42);
    }

    .slider-container {
      display: flex;
      align-items: center;
      justify-content: center;
      min-width: 44px;
      height: 194px;
      padding-bottom: 10px;
    }
  `;

  return html`
    <div class="slider-container ${additionalClass ?? ''}">
      <style>
        ${styles}
      </style>
      <wa-slider
        orientation="vertical"
        class="slider ${additionalClass ?? ''}"
        @input=${callOnSlider}
        @change=${callOnChange}
        .min=${min}
        .max=${max}
        .value=${startVal}
        aria-label="Level"
      >
      </wa-slider>
    </div>
  `;
}
