import {html, PolymerElement} from '../@polymer/polymer/polymer-element.js';
<<<<<<< HEAD
=======

const CodeMirror = (async () => {
  const _codeMirror = '../codemirror/src/codemirror.js';
  const module = await import(_codeMirror);
  return module.default;
})();
// import 'codemirror/mode/javascript/javascript';
>>>>>>> master
/**
 *
 <script src="../node_modules/codemirror/mode/htmlmixed/htmlmixed.js"></script>
 <script src="../node_modules/codemirror/mode/clike/clike.js"></script>
 <script src="../node_modules/codemirror/mode/javascript/javascript.js"></script>
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
        
        textarea[hide] {
          display: none;
        }
      </style>
      
      <textarea id="textArea" hide$="[[loadingEditor]]"></textarea>
      [[editorText]]
    `;
  }
  static get properties() {
    return {
      code: {
        type: String,
        reflectToAttribute: true,
        observer: '_changeValueOnTextArea'
      },
      editorText: {
        type: String,
        notify: true
      },
      CodeMirror: {
        type: Object,
        observer: '_readyToPlay'
      },
      editor: {
        type: Object,
        observer: '_readyToPlayWithEditor'
      },
      loadingEditor: {
        type: Boolean,
        value: true
      }
    };
  }

  _changeValueOnTextArea(code) {
    if (this.editor) {
      this.editor.setValue(code);
      this.editor.refresh();
    }
  }

  _readyToPlayWithEditor() {
    this.loadingEditor = false;
    this.editor.setValue(this.code);
    this.set('editorText', this.editor.getValue());
  }

  _readyToPlay(newValue) {
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
    this.set('editor', this.CodeMirror.fromTextArea(this.shadowRoot.querySelector('#textArea'), options));
    this.editor.setSize('100%', '100%');
    this.editor.on('changes', () => {
      this.set('editorText', this.editor.getValue().replace(/\r?\n/g, "\n"));
    })
  }

  _codeMirror() {
    CodeMirror.then(solve => {
      this.set('CodeMirror', solve);
    });
  }

  connectedCallback() {
    super.connectedCallback();
    this._codeMirror();
  }



}

window.customElements.define('codemirror-wrapper', CodemirrorWrapper);
