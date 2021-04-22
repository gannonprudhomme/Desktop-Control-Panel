import {
  css, html, TemplateResult,
} from 'lit-element';

// Reference: https://stackoverflow.com/a/61453050/
// We probably need to get this type from somewhere
/**
 * Creates a slider
 * @param onSlide Function to be updated on every slide update
 * @param onChange Function that's called only when the user is done sliding
 * @param startVal The start value of the slider
 * @param min Minimum value of the slider
 * @param max Maximum value of the slider
 * @returns TemplateResult (html) of the slider
 */
export default function createSlider(
  onSlide: (value: number) => void, onChange: (value: number) => void, startVal: number, min = 0,
  max = 100,
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

  const styles = css`
    .slider {
      /* background: #d3d3d3; */
      outline: none;
      transition: opacity .2s;
      appearance: slider-vertical;
      width: 0;
      height: 100%;
    }

    /*.slider::-webkit-slider-thumb {*/
    input[type=range]::-webkit-slider-thumb {
      width: 100px;
      height: 100px;
      border-radius: 30px;
      background: #4CAF50 !important;
    }
    /*
    .slider::-moz-range-thumb {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: #4CAF50 !important;
    }
    */
    
    input[type=range]::-webkit-slider-runnable-track {
      height: 300px;
    }

    input[type=range]::-webkit-slider-runnable-track {
      /* width: 100%; */
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
      background: #367ebd;
    }

    /*
    input[type=range]::-moz-range-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: #3071a9;
      border-radius: 1.3px;
      border: 0.2px solid #010101;
    }
    */

    /*
    input[type=range]::-ms-track {
      width: 100%;
      height: 8.4px;
      cursor: pointer;
      background: transparent;
      border-color: transparent;
      border-width: 16px 0;
      color: transparent;
    }
    input[type=range]::-ms-fill-lower {
      background: #2a6495;
      border: 0.2px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]:focus::-ms-fill-lower {
      background: #3071a9;
    }
    input[type=range]::-ms-fill-upper {
      background: #3071a9;
      border: 0.2px solid #010101;
      border-radius: 2.6px;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
    }
    input[type=range]:focus::-ms-fill-upper {
      background: #367ebd;
    }
    */
  `;

  return html`
    <style>
      ${styles}
    </style>
    <input
      type="range"
      orient="vertical"
      class="slider"
      @input=${callOnSlider}
      @change=${callOnChange}
      value=${startVal}
      min=${min}
      max=${max}
    >
    </input>
  `;
}
