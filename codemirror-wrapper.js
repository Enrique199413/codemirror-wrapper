import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';

/**
 * `codemirror-wrapper`
 * 
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class CodemirrorWrapper extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
    `;
  }
  static get properties() {
    return {
      prop1: {
        type: String,
        value: 'codemirror-wrapper',
      },
    };
  }
}

window.customElements.define('codemirror-wrapper', CodemirrorWrapper);
