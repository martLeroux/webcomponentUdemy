import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
export class StockPrice {
    constructor() {
        this.stockInputValid = false;
        this.error = '';
        this.loading = true;
    }
    stockSymbolChanged(newValue, oldValue) {
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.fetchStockPrice(newValue);
        }
    }
    componentDidLoad() {
        if (this.stockSymbol) {
            //this.initialStockSymbol = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
            this.stockUserInput = this.stockSymbol;
        }
    }
    onStockSymbolSelected(event) {
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    }
    componentWillLoad() {
        console.log('componentWillLoad');
    }
    componentWillUpdate() {
        console.log('componentWillUpdate');
    }
    componentDidUpdate() {
        console.log('componentDidUpdate');
        /*if (this.stockSymbol !== this.initialStockSymbol) {
            this.initialStockSymbol = this.stockSymbol;
            this.fetchStockPrice(this.stockSymbol);
            this.stockUserInput = this.stockSymbol;
        } */
    }
    componentDidUnload() {
        console.log('componentDidUnload');
    }
    fetchStockPrice(stockSymbol) {
        this.loading = true;
        fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`)
            .then(res => {
            return res.json();
        })
            .then(parsedRes => {
            if (!parsedRes['Global Quote']['05. price']) {
                throw new Error('Invalid!!');
            }
            this.error = null;
            this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            this.loading = false;
        })
            .catch(err => {
            console.log(err);
            this.error = err.message;
            this.loading = false;
        });
    }
    onUserInput(event) {
        this.stockUserInput = event.target.value;
        if (this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        }
        else {
            this.stockInputValid = false;
        }
    }
    onFetchStockPrice(event) {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement).value;
        this.stockSymbol = this.stockInput.value;
        //this.fetchStockPrice(stockSymbol);
    }
    hostData() {
        return { class: {
                'error': this.error
            } };
    }
    render() {
        let dataContent = h("p", null, "Please enter a stock symbol");
        if (this.fetchedPrice) {
            dataContent = h("p", null,
                "Price: $",
                this.fetchedPrice);
        }
        if (this.error) {
            dataContent = h("p", null, this.error);
        }
        if (this.loading) {
            dataContent = h("dsc-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) },
                h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }),
                h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
            h("div", null, dataContent)
        ];
    }
    static get is() { return "dsc-stock-price"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-price.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-price.css"]
    }; }
    static get properties() { return {
        "stockSymbol": {
            "type": "string",
            "mutable": true,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "stock-symbol",
            "reflect": false
        }
    }; }
    static get states() { return {
        "fetchedPrice": {},
        "stockUserInput": {},
        "stockInputValid": {},
        "error": {},
        "loading": {}
    }; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "stockSymbol",
            "methodName": "stockSymbolChanged"
        }]; }
    static get listeners() { return [{
            "name": "dscSymbolSelected",
            "method": "onStockSymbolSelected",
            "target": "body",
            "capture": false,
            "passive": false
        }]; }
}
