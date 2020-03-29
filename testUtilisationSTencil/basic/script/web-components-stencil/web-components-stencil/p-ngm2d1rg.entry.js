import{r as t,h as s,c as i,g as e,H as n}from"./p-d38b04e9.js";const o=class{constructor(s){t(this,s)}render(){return s("div",{class:"lds-ring"},s("div",null),s("div",null),s("div",null),s("div",null))}static get style(){return".lds-ring{display:inline-block;position:relative;width:64px;height:64px}.lds-ring div{-webkit-box-sizing:border-box;box-sizing:border-box;display:block;position:absolute;width:51px;height:51px;margin:6px;border:6px solid #3b013b;border-radius:50%;-webkit-animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;animation:lds-ring 1.2s cubic-bezier(.5,0,.5,1) infinite;border-color:#3b013b transparent transparent transparent}.lds-ring div:first-child{-webkit-animation-delay:-.45s;animation-delay:-.45s}.lds-ring div:nth-child(2){-webkit-animation-delay:-.3s;animation-delay:-.3s}.lds-ring div:nth-child(3){-webkit-animation-delay:-.15s;animation-delay:-.15s}\@-webkit-keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}\@keyframes lds-ring{0%{-webkit-transform:rotate(0deg);transform:rotate(0deg)}to{-webkit-transform:rotate(1turn);transform:rotate(1turn)}}"}},l=class{constructor(s){t(this,s),this.searchResults=[],this.loading=!1,this.dscSymbolSelected=i(this,"dscSymbolSelected",7)}onFindStock(t){this.loading=!0,t.preventDefault(),fetch(`https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=${this.stockNameInput.value}&apikey=OHFCVT0L7HZZCDA8`).then(t=>t.json()).then(t=>{console.log(t),this.searchResults=t.bestMatches.map(t=>({name:t["2. name"],symbol:t["1. symbol"]})),this.loading=!1}).catch(t=>{this.loading=!1,console.log(t)})}onSelectSymbol(t){this.dscSymbolSelected.emit(t)}render(){let t=s("ul",null,this.searchResults.map(t=>s("li",{onClick:this.onSelectSymbol.bind(this,t.symbol)},s("strong",null,t.symbol)," - ",t.name)));return this.loading&&(t=s("dsc-spinner",null)),[s("form",{onSubmit:this.onFindStock.bind(this)},s("input",{id:"stock-symbol",ref:t=>this.stockNameInput=t}),s("button",{type:"submit"},"Find")),t]}static get style(){return":host{font-family:sans-serif;border:2px solid var(--color-primary,#000);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary,#000);padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid var(--color-primary,#000);background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff);cursor:pointer}form button:active,form button:hover{background:var(--color-primary-highlight,grey);border-color:var(--color-primary-highlight,grey)}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:active,li:hover{background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff)}"}},c=class{constructor(s){t(this,s),this.stockInputValid=!1,this.error="",this.loading=!0}stockSymbolChanged(t,s){t!==s&&(this.stockUserInput=t,this.fetchStockPrice(t))}componentDidLoad(){this.stockSymbol&&(this.stockInputValid=!0,this.fetchStockPrice(this.stockSymbol),this.stockUserInput=this.stockSymbol)}onStockSymbolSelected(t){t.detail&&t.detail!==this.stockSymbol&&(this.stockSymbol=t.detail)}componentWillLoad(){console.log("componentWillLoad")}componentWillUpdate(){console.log("componentWillUpdate")}componentDidUpdate(){console.log("componentDidUpdate")}componentDidUnload(){console.log("componentDidUnload")}fetchStockPrice(t){this.loading=!0,fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${t}&apikey=OHFCVT0L7HZZCDA8`).then(t=>t.json()).then(t=>{if(!t["Global Quote"]["05. price"])throw new Error("Invalid!!");this.error=null,this.fetchedPrice=+t["Global Quote"]["05. price"],this.loading=!1}).catch(t=>{console.log(t),this.error=t.message,this.loading=!1})}onUserInput(t){this.stockUserInput=t.target.value,this.stockInputValid=""!==this.stockUserInput.trim()}onFetchStockPrice(t){t.preventDefault(),this.stockSymbol=this.stockInput.value}hostData(){return{class:{error:this.error}}}__stencil_render(){let t=s("p",null,"Please enter a stock symbol");return this.fetchedPrice&&(t=s("p",null,"Price: $",this.fetchedPrice)),this.error&&(t=s("p",null,this.error)),this.loading&&(t=s("dsc-spinner",null)),[s("form",{onSubmit:this.onFetchStockPrice.bind(this)},s("input",{id:"stock-symbol",ref:t=>this.stockInput=t,value:this.stockUserInput,onInput:this.onUserInput.bind(this)}),s("button",{type:"submit",disabled:!this.stockInputValid||this.loading},"Fetch")),s("div",null,t)]}get el(){return e(this)}static get watchers(){return{stockSymbol:["stockSymbolChanged"]}}render(){return s(n,this.hostData(),this.__stencil_render())}static get style(){return":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:#e79804}form input{font:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}"}};export{o as dsc_spinner,l as dsc_stock_finder,c as dsc_stock_price};