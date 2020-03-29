import { r as registerInstance, h, c as createEvent, g as getElement, H as Host } from './core-d8a25c48.js';
var Spinner = /** @class */ (function () {
    function Spinner(hostRef) {
        registerInstance(this, hostRef);
    }
    Spinner.prototype.render = function () {
        return (h("div", { class: "lds-ring" }, h("div", null), h("div", null), h("div", null), h("div", null)));
    };
    Object.defineProperty(Spinner, "style", {
        get: function () { return ".lds-ring{display:inline-block;position:relative;width:64px;height:64px}.lds-ring div{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;width:51px;height:51px;margin:6px;border:6px solid #3b013b;border-radius:50%;-webkit-animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:first-child{-webkit-animation-delay:-.45s;animation-delay:-.45s}.lds-ring div:nth-child(2){-webkit-animation-delay:-.3s;animation-delay:-.3s}.lds-ring div:nth-child(3){-webkit-animation-delay:-.15s;animation-delay:-.15s}\@-webkit-keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"; },
        enumerable: true,
        configurable: true
    });
    return Spinner;
}());
var AV_API_KEY = 'OHFCVT0L7HZZCDA8';
var StockFinder = /** @class */ (function () {
    function StockFinder(hostRef) {
        registerInstance(this, hostRef);
        this.searchResults = [];
        this.loading = false;
        this.dscSymbolSelected = createEvent(this, "dscSymbolSelected", 7);
    }
    StockFinder.prototype.onFindStock = function (event) {
        var _this = this;
        this.loading = true;
        event.preventDefault();
        var stockName = this.stockNameInput.value;
        fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=" + stockName + "&apikey=" + AV_API_KEY)
            .then(function (res) { return res.json(); })
            .then(function (parsedRes) {
            console.log(parsedRes);
            _this.searchResults = parsedRes['bestMatches'].map(function (match) {
                return { name: match['2. name'], symbol: match['1. symbol'] };
            });
            _this.loading = false;
        }).catch(function (err) {
            _this.loading = false;
            console.log(err);
        });
    };
    StockFinder.prototype.onSelectSymbol = function (symbol) {
        this.dscSymbolSelected.emit(symbol);
    };
    StockFinder.prototype.render = function () {
        var _this = this;
        var content = h("ul", null, this.searchResults.map(function (result) { return (h("li", { onClick: _this.onSelectSymbol.bind(_this, result.symbol) }, h("strong", null, result.symbol), " - ", result.name)); }));
        if (this.loading) {
            content = h("dsc-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStock.bind(this) }, h("input", { id: "stock-symbol", ref: function (el) { return _this.stockNameInput = el; } }), h("button", { type: "submit" }, "Find")),
            content
        ];
    };
    Object.defineProperty(StockFinder, "style", {
        get: function () { return ":host{font-family:sans-serif;border:2px solid var(--color-primary,#000);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary,#000);padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid var(--color-primary,#000);background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff);cursor:pointer}form button:active,form button:hover{background:var(--color-primary-highlight,grey);border-color:var(--color-primary-highlight,grey)}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:active,li:hover{background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff)}"; },
        enumerable: true,
        configurable: true
    });
    return StockFinder;
}());
var StockPrice = /** @class */ (function () {
    function StockPrice(hostRef) {
        registerInstance(this, hostRef);
        this.stockInputValid = false;
        this.error = '';
        this.loading = true;
    }
    StockPrice.prototype.stockSymbolChanged = function (newValue, oldValue) {
        if (newValue !== oldValue) {
            this.stockUserInput = newValue;
            this.fetchStockPrice(newValue);
        }
    };
    StockPrice.prototype.componentDidLoad = function () {
        if (this.stockSymbol) {
            //this.initialStockSymbol = this.stockSymbol;
            this.stockInputValid = true;
            this.fetchStockPrice(this.stockSymbol);
            this.stockUserInput = this.stockSymbol;
        }
    };
    StockPrice.prototype.onStockSymbolSelected = function (event) {
        if (event.detail && event.detail !== this.stockSymbol) {
            this.stockSymbol = event.detail;
        }
    };
    StockPrice.prototype.componentWillLoad = function () {
        console.log('componentWillLoad');
    };
    StockPrice.prototype.componentWillUpdate = function () {
        console.log('componentWillUpdate');
    };
    StockPrice.prototype.componentDidUpdate = function () {
        console.log('componentDidUpdate');
        /*if (this.stockSymbol !== this.initialStockSymbol) {
            this.initialStockSymbol = this.stockSymbol;
            this.fetchStockPrice(this.stockSymbol);
            this.stockUserInput = this.stockSymbol;
        } */
    };
    StockPrice.prototype.componentDidUnload = function () {
        console.log('componentDidUnload');
    };
    StockPrice.prototype.fetchStockPrice = function (stockSymbol) {
        var _this = this;
        this.loading = true;
        fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=" + stockSymbol + "&apikey=" + AV_API_KEY)
            .then(function (res) {
            return res.json();
        })
            .then(function (parsedRes) {
            if (!parsedRes['Global Quote']['05. price']) {
                throw new Error('Invalid!!');
            }
            _this.error = null;
            _this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
            _this.loading = false;
        })
            .catch(function (err) {
            console.log(err);
            _this.error = err.message;
            _this.loading = false;
        });
    };
    StockPrice.prototype.onUserInput = function (event) {
        this.stockUserInput = event.target.value;
        if (this.stockUserInput.trim() !== '') {
            this.stockInputValid = true;
        }
        else {
            this.stockInputValid = false;
        }
    };
    StockPrice.prototype.onFetchStockPrice = function (event) {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement).value;
        this.stockSymbol = this.stockInput.value;
        //this.fetchStockPrice(stockSymbol);
    };
    StockPrice.prototype.hostData = function () {
        return { class: {
                'error': this.error
            } };
    };
    StockPrice.prototype.__stencil_render = function () {
        var _this = this;
        var dataContent = h("p", null, "Please enter a stock symbol");
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
            h("form", { onSubmit: this.onFetchStockPrice.bind(this) }, h("input", { id: "stock-symbol", ref: function (el) { return _this.stockInput = el; }, value: this.stockUserInput, onInput: this.onUserInput.bind(this) }), h("button", { type: "submit", disabled: !this.stockInputValid || this.loading }, "Fetch")),
            h("div", null, dataContent)
        ];
    };
    Object.defineProperty(StockPrice.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StockPrice, "watchers", {
        get: function () {
            return {
                "stockSymbol": ["stockSymbolChanged"]
            };
        },
        enumerable: true,
        configurable: true
    });
    StockPrice.prototype.render = function () { return h(Host, this.hostData(), this.__stencil_render()); };
    Object.defineProperty(StockPrice, "style", {
        get: function () { return ":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:#e79804}form input{font:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}"; },
        enumerable: true,
        configurable: true
    });
    return StockPrice;
}());
export { Spinner as dsc_spinner, StockFinder as dsc_stock_finder, StockPrice as dsc_stock_price };
