import { r as registerInstance, c as createEvent, h, g as getElement, H as Host } from './core-d8a25c48.js';

const AV_API_KEY = 'OHFCVT0L7HZZCDA8';

const StockFinder = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
        this.searchResults = [];
        this.loading = false;
        this.dscSymbolSelected = createEvent(this, "dscSymbolSelected", 7);
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
        let content = h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name))));
        if (this.loading) {
            content = h("dsc-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStock.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }), h("button", { type: "submit" }, "Find")),
            content
        ];
    }
    static get style() { return ":host{font-family:sans-serif;border:2px solid var(--color-primary,#000);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary,#000);padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid var(--color-primary,#000);background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff);cursor:pointer}form button:active,form button:hover{background:var(--color-primary-highlight,grey);border-color:var(--color-primary-highlight,grey)}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:active,li:hover{background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff)}"; }
};

const StockPrice = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
        let dataContent = h("p", null, "Please enter a stock symbol");
        if (this.fetchedPrice) {
            dataContent = h("p", null, "Price: $", this.fetchedPrice);
        }
        if (this.error) {
            dataContent = h("p", null, this.error);
        }
        if (this.loading) {
            dataContent = h("dsc-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: el => this.stockInput = el, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
            h("div", null, dataContent)
        ];
    }
    get el() { return getElement(this); }
    static get watchers() { return {
        "stockSymbol": ["stockSymbolChanged"]
    }; }
    render() { return h(Host, this.hostData(), this.__stencil_render()); }
    static get style() { return ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:#e79804}form input{font:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}"; }
};

export { StockFinder as dsc_stock_finder, StockPrice as dsc_stock_price };
