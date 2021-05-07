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

    /* cursor: pointer; */
  }

  .element-to-rotate {
    display: block;
    transform-origin: top left;
    /* transition: opacity .2s; */
    /* -webkit-transition: .2s; */
    transform: rotate(-90deg);
    /* Note: for a CLOCKWISE rotation, use the commented-out
          transform instead of this one. */
    /* transform: rotate(-90deg) translate(-100%); */
    /* transform: rotate(90deg) translate(0, -100%); */
    margin-top: -50%;
    /* Not vital, but possibly a good idea if the element you're rotating contains
          text and you want a single long vertical line of text and the pre-rotation
          width of your element is small enough that the text wraps: */
    white-space: nowrap;
  }

  /* TODO: This doesn't seem to do anything and idk why */
  .slider-container { /* Centers it */
    width: 0;
    margin-left: 25%;
  }
  `;

  const oldStyles = css`
    .slider {
      /* background: #d3d3d3; */
      outline: none;
      transition: opacity .2s;
      /* appearance: slider-vertical; */
      /* width: 0; */
      /* height: 100%; */
      /* transform: rotateZ(270deg); */
      margin-bottom: 100px;
      transform: rotate(-90deg);
      -moz-transform: rotate(-90deg);
      /* transform-origin: center left; */
    }

    input[type=range] {
      -webkit-appearance: none;
      appearance: none;
    }

    /*.slider::-webkit-slider-thumb {*/
    input[type=range]::-webkit-slider-thumb {
      width: 100px;
      height: 100px;
      border-radius: 300px;
      background-color: red !important;
      background: orange;
      color: orange;
    }

    input[type=range]::-moz-range-thumb {
      width: 30px;
      height: 30px;
      border-radius: 15px;
      background: red !important;
      color: yellow;
    }
    
    input[type=range]::-webkit-slider-runnable-track {
      width: 30px;
      height: 30px; /* actually width */
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: green;
    }

    input[type=range]:focus::-webkit-slider-runnable-track {
    }

    /*
    input[type=range]::-moz-range-track {
      width: 100%;
      cursor: pointer;
      box-shadow: 1px 1px 1px #000000, 0px 0px 1px #0d0d0d;
      background: green;
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

  const classes = additionalClass ? `slider-container ${additionalClass}` : 'slider-container';

  return html`
    <!-- <div class="${classes}"> -->
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
        value=${startVal}
        min=${min}
        max=${max}
      >
      </input>
    </div>
  `;
}
