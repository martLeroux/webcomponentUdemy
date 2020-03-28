import { Component, h, State, Element } from "@stencil/core";
import { AV_API_KEY } from '../../global/global';

@Component({
    tag: 'dsc-stock-price',
    styleUrl: './stock-price.css',
    shadow: true
})
export class StockPrice {
    stockInput: HTMLInputElement;
    @Element() el: HTMLElement;
    @State() fetchedPrice: number;
    @State() stockUserInput: string;
    @State() stockInputValid = false;
    @State() error = '';

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
        const stockSymbol = this.stockInput.value;
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