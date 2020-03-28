import { Component, h, State, Element, Prop, Watch } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'dsc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    stockInput: HTMLInputElement;
    //initialStockSymbol: string;
    @Element() el: HTMLElement;
    @State() fetchedPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() error = '';

    @Prop({mutable: true}) stockSymbol: string;
    @Watch('stockSymbol')
    stockSymbolChanged(newValue: string, oldValue: string) {
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

    fetchStockPrice(stockSymbol: string) {
        fetch(
            `https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${stockSymbol}&apikey=${AV_API_KEY}`
        )
        .then(res => {
            return res.json();
        })
        .then(parsedRes => {
            if (!parsedRes['Global Quote']['05. price']) {
                throw new Error('Invalid!!');
            }
            this.error = null;
            this.fetchedPrice = +parsedRes['Global Quote']['05. price'];
        })
        .catch(err => {
            console.log(err);
            this.error = err.message;
        });
    }

    onUserInput(event: Event) {
        this.stockUserInput = (event.target as HTMLInputElement).value;
        if (this.stockUserInput.trim() !== '' ) {
            this.stockInputValid = true;
        } else {
            this.stockInputValid =false;
        }
    }

    onFetchStockPrice(event) {
        event.preventDefault();
        //const stockSymbol = (this.el.shadowRoot.querySelector("#stock-symbol") as HTMLInputElement).value;
        this.stockSymbol = this.stockInput.value;
        //this.fetchStockPrice(stockSymbol);
    }


    render() {
        let dataContent = <p>Please enter a stock symbol</p>;
        if (this.fetchedPrice) {
            dataContent = <p>Price: ${this.fetchedPrice}</p>
        }
        if (this.error) {
            dataContent = <p>{this.error}</p>
        }
        
        return [
            <form onSubmit={this.onFetchStockPrice.bind(this)}>
                <input id="stock-symbol" ref={el => this.stockInput = el} value={this.stockUserInput} onInput={this.onUserInput.bind(this)} />
                <button type="submit" disabled={!this.stockInputValid}>Fetch</button>
            </form>,
            <div>
                {dataContent}
            </div>
        ];
    }
}