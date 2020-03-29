export declare class StockPrice {
    stockInput: HTMLInputElement;
    el: HTMLElement;
    fetchedPrice: number;
    stockUserInput: string;
    stockInputValid: boolean;
    error: string;
    loading: boolean;
    stockSymbol: string;
    stockSymbolChanged(newValue: string, oldValue: string): void;
    componentDidLoad(): void;
    onStockSymbolSelected(event: CustomEvent): void;
    componentWillLoad(): void;
    componentWillUpdate(): void;
    componentDidUpdate(): void;
    componentDidUnload(): void;
    fetchStockPrice(stockSymbol: string): void;
    onUserInput(event: Event): void;
    onFetchStockPrice(event: any): void;
    hostData(): {
        class: {
            'error': string;
        };
    };
    render(): any[];
}
