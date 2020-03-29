'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-38c9c5cc.js');

const Spinner = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    render() {
        return (core.h("div", { class: "lds-ring" }, core.h("div", null), core.h("div", null), core.h("div", null), core.h("div", null)));
    }
    static get style() { return ".lds-ring{display:inline-block;position:relative;width:64px;height:64px}.lds-ring div{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;width:51px;height:51px;margin:6px;border:6px solid #3b013b;border-radius:50%;-webkit-animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:first-child{-webkit-animation-delay:-.45s;animation-delay:-.45s}.lds-ring div:nth-child(2){-webkit-animation-delay:-.3s;animation-delay:-.3s}.lds-ring div:nth-child(3){-webkit-animation-delay:-.15s;animation-delay:-.15s}\@-webkit-keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"; }
};

const AV_API_KEY = 'OHFCVT0L7HZZCDA8';

const StockFinder = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
        this.searchResults = [];
        this.loading = false;
        this.dscSymbolSelected = core.createEvent(this, "dscSymbolSelected", 7);
    }
    onFindStock(event) {
        this.loading = true;
        event.preventDefault();
        const stockName = this.stockNameInput.value;
        fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${stockName}&apikey=${AV_API_KEY}`)
            .then(res => res.json())
            .then(parsedRes => {
            console.log(parsedRes);
            this.searchResults = parsedRes['bestMatches'].map(match => {
                return { name: match['2. name'], symbol: match['1. symbol'] };
            });
            this.loading = false;
        }).catch(err => {
            this.loading = false;
            console.log(err);
        });
    }
    onSelectSymbol(symbol) {
        this.dscSymbolSelected.emit(symbol);
    }
    render() {
        let content = core.h("ul", null, this.searchResults.map(result => (core.h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, core.h("strong", null, result.symbol), " - ", result.name))));
        if (this.loading) {
            content = core.h("dsc-spinner", null);
        }
        return [
            core.h("form", { onSubmit: this.onFindStock.bind(this) }, core.h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }), core.h("button", { type: "submit" }, "Find")),
            content
        ];
    }
    static get style() { return ":host{font-family:sans-serif;border:2px solid var(--color-primary,#000);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary,#000);padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid var(--color-primary,#000);background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff);cursor:pointer}form button:active,form button:hover{background:var(--color-primary-highlight,grey);border-color:var(--color-primary-highlight,grey)}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:active,li:hover{background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff)}"; }
};

const StockPrice = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
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
    __stencil_render() {
        let dataContent = core.h("p", null, "Please enter a stock symbol");
        if (this.fetchedPrice) {
            dataContent = core.h("p", null, "Price: $", this.fetchedPrice);
        }
        if (this.error) {
            dataContent = core.h("p", null, this.error);
        }
        if (this.loading) {
            dataContent = core.h("dsc-spinner", null);
        }
        return [
            core.h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, core.h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), core.h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
            core.h("div", null, dataContent)
        ];
    }
    get el() { return core.getElement(this); }
    static get watchers() { return {
        "stockSymbol": ["stockSymbolChanged"]
    }; }
    render() { return core.h(core.Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:#e79804}form input{font:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}"; }
};

exports.dsc_spinner = Spinner;
exports.dsc_stock_finder = StockFinder;
exports.dsc_stock_price = StockPrice;
