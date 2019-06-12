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
      <link href="../node_modules/codemirror/lib/codemirror.css" rel="stylesheet">
      <link href="../node_modules/codemirror/theme/night.css" rel="stylesheet">
      <style>
        :host {
          display: block;
        }
      </style>
      <h2>Hello [[prop1]]!</h2>
      <textarea id="textArea"></textarea>
      <div id="code"></div>
    `;
  }
  static get properties() {
    return {
      value: {
        type: String,
        value: 'test-polytres',
      },
      valorCorrecto: {
        type: String,
        value: 'valorCorrecto;',
        reflectToAttribute: true,
        observer: '_changeValueOnTextArea'
      }
    };
  }

  _changeValueOnTextArea(newValue) {
    setTimeout(() => {
      this.editor.setValue(newValue);

    }, 0);
  }

  connectedCallback() {
    super.connectedCallback();
      let options = {
        mode:  "javascript",
        lineNumbers: 'true',
        theme: 'night'
      };
      //CodeMirror(this.shadowRoot.querySelector('#textArea'), options);
      this.set('editor', CodeMirror.fromTextArea(this.shadowRoot.querySelector('#textArea'), options));
    
  }
  
}

window.customElements.define('codemirror-wrapper', CodemirrorWrapper);
