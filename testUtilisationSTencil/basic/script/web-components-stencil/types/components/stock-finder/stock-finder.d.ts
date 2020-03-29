import { EventEmitter } from "../../stencil.core";
export declare class StockFinder {
    stockNameInput: HTMLInputElement;
    searchResults: {
        symbol: string;
        name: string;
    }[];
    loading: boolean;
    dscSymbolSelected: EventEmitter<string>;
    onFindStock(event: Event): void;
    onSelectSymbol(symbol: string): void;
    render(): any[];
}
