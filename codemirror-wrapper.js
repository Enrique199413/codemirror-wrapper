import {html, PolymerElement} from '../@polymer/polymer/polymer-element.js';
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
      <link href="../node_modules/codemirror/theme/material.css" rel="stylesheet">
      <style>
        :host {
          display: block;
          min-width: 400px;
        }
      </style>
      <h2>Prueba codemirror</h2>
      <textarea id="textArea"></textarea>
    `;
  }
  static get properties() {
    return {
      valorCorrecto: {
        type: String,
        value: 'function myScript(){return 100;} jg',
        reflectToAttribute: true,
        observer: '_changeValueOnTextArea'
      },
      outCode: {
        type: String,
        value: '',
        notify: true
      }
    };
  }

  _changeValueOnTextArea(newValue) {
    setTimeout(() => {
      this.editor.setValue(newValue);
    }, 0);
    console.log(newValue);
  }

  connectedCallback() {
    super.connectedCallback();
      let options = {
        mode:  "javascript",
        lineNumbers: 'true',
        lineWrapping: true,
        lineSeparation: 'CRLF',
        theme: 'material',
        //readOnly: 'nocursor'
        direction: 'ltr',
        tabMode: 'indent'
      };
      //CodeMirror(this.shadowRoot.querySelector('#textArea'), options);
      this.set('editor', CodeMirror.fromTextArea(this.shadowRoot.querySelector('#textArea'), options));
      this.editor.on('change', editor => {
        //console.log(editor.getValue());
        let valoresSpace = editor.getValue();
        valoresSpace = valoresSpace.replace(/\r?\n/g, "\n");
        this.set('outCode', valoresSpace);
        console.log(this.outCode);
        //this.set('outCode', editor.getValue());
      });

      this.editor.setSize('100%', '100%');
      

  }
  
}

window.customElements.define('codemirror-wrapper', CodemirrorWrapper);
