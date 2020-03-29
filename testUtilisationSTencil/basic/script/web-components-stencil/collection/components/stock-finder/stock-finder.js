import { h } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';
export class StockFinder {
    constructor() {
        this.searchResults = [];
        this.loading = false;
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
        let content = h("ul", null, this.searchResults.map(result => (h("li", { onClick: this.onSelectSymbol.bind(this, result.symbol) },
            h("strong", null, result.symbol),
            " - ",
            result.name))));
        if (this.loading) {
            content = h("dsc-spinner", null);
        }
        return [
            h("form", { onSubmit: this.onFindStock.bind(this) },
                h("input", { id: "stock-symbol", ref: el => this.stockNameInput = el }),
                h("button", { type: "submit" }, "Find")),
            content
        ];
    }
    static get is() { return "dsc-stock-finder"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./stock-finder.css"]
    }; }
    static get styleUrls() { return {
        "$": ["stock-finder.css"]
    }; }
    static get states() { return {
        "searchResults": {},
        "loading": {}
    }; }
    static get events() { return [{
            "method": "dscSymbolSelected",
            "name": "dscSymbolSelected",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": ""
            },
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            }
        }]; }
}
