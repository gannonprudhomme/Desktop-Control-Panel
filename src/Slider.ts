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
    const valueStr = (<HTMLInputElement>event.target).value;
    // convert value to an int
    const value = Number.parseInt(valueStr, 10);

    if (onSlide) {
      onSlide(value);
    }
  };

  const callOnChange = (event: Event) => {
    const valueStr = (<HTMLInputElement>event.target).value;
    // convert value to an int
    const value = Number.parseInt(valueStr, 10);

    if (onChange) {
      onChange(value);
    }
  };

  // https://stackoverflow.com/a/58095358/
  const styles = css`
    .slider {
      -webkit-appearance: none;
      /* TODO: This width does *not* scale well, but it's really wack since vh isn't working */
      width: min(30vw, 74vh);
      height: 12px; /* width of the track */
      border-radius: 25px;
      background: #d3d3d3;
      outline: none;
      opacity: 0.7;

      margin-left: -50%;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;

    width: 36px;
    height: 36px;

    background: #fff;
    border-radius: 50%;
    border: 2px solid currentColor;
  }

  .slider::-moz-slider-thumb {
    appearance: none;

    width: 36px;
    height: 36px;

    background: #fff;
    border-radius: 50%;
    border: 2px solid currentColor;
  }

  .element-to-rotate {
    display: block;
    transform-origin: top left;
    transform: rotate(-90deg);
    margin-top: -50%;
    white-space: nowrap;
  }

  /* TODO: This doesn't seem to do anything and idk why */
  .slider-container { /* Centers it */
    width: 0;
    margin-left: 25%;
  }
  `;

  return html`
    <div class="slider-container ${additionalClass}">
      <style>
        ${styles}
      </style>
      <input
        type="range"
        orient="vertical"
        class="slider element-to-rotate"
        @input=${callOnSlider}
        @change=${callOnChange}
        min=${min}
        max=${max}
        value=${startVal}
      >
      </input>
    </div>
  `;
}
