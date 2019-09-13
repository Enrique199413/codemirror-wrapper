import { LitElement, html } from 'lit-element';

class MyElement extends LitElement {
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
          },
          myProp: {
              type: String
          }
        };
    }

    constructor() {
        super();
        this.myProp = 'Soy un lit';
        
    }



    render(){
        return html`
            <link href="../node_modules/codemirror/lib/codemirror.css" rel="stylesheet">
            <link href="../node_modules/codemirror/theme/night.css" rel="stylesheet">
            <script src="../node_modules/codemirror/lib/codemirror.js"></script>
            <script src="../node_modules/codemirror/mode/htmlmixed/htmlmixed.js"></script>
            <script src="../node_modules/codemirror/mode/clike/clike.js"></script>
            <script src="../node_modules/codemirror/mode/javascript/javascript.js"></script>
            <style>
            :host {
                display: block;
            }
            </style>
            <p>${this.myProp}</p>
            <textarea id="textArea"></textarea>
        `;
    }

}
// Register the new element with the browser.
customElements.define('my-element', MyElement);