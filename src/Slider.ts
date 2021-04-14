import {
  css, CSSResult, html, LitElement, TemplateResult, property,
} from 'lit-element';

// Reference: https://stackoverflow.com/a/61453050/
// We probably need to get this type from somewhere
export default function createSlider(
  onSlide: (value: number) => void, min = 0, max = 100, orientation = 'vertical',
): TemplateResult {
  const callOnSlider = (event: Event) => {
    const valueStr = (<HTMLInputElement>event.target).value;
    // convert value to an int
    const value = Number.parseInt(valueStr, 10);

    if (onSlide) {
      onSlide(value);
      // also set this things value too
    }
  };

  const styles = css`
    .slider {
      background: #d3d3d3;
      outline: none;
      transition: opacity .2s;
      appearance: slider-vertical;
      width: 0;
    }

    /*.slider::-webkit-slider-thumb {*/
    input[type=range]::-webkit-slider-thumb {
      width: 64px;
      height: 64px;
      border-radius: 15px;
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
      height: 90px;
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
    <input type="range" orient="vertical" class="slider" @input=${callOnSlider}></input>
  `;
}
