System.register(["./p-581d5004.system.js"],(function(t){"use strict";var e,o,n,i,r;return{setters:[function(t){e=t.r;o=t.c;n=t.h;i=t.g;r=t.H}],execute:function(){var s="OHFCVT0L7HZZCDA8";var c=t("dsc_stock_finder",function(){function t(t){e(this,t);this.searchResults=[];this.loading=false;this.dscSymbolSelected=o(this,"dscSymbolSelected",7)}t.prototype.onFindStock=function(t){var e=this;this.loading=true;t.preventDefault();var o=this.stockNameInput.value;fetch("https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords="+o+"&apikey="+s).then((function(t){return t.json()})).then((function(t){console.log(t);e.searchResults=t["bestMatches"].map((function(t){return{name:t["2. name"],symbol:t["1. symbol"]}}));e.loading=false})).catch((function(t){e.loading=false;console.log(t)}))};t.prototype.onSelectSymbol=function(t){this.dscSymbolSelected.emit(t)};t.prototype.render=function(){var t=this;var e=n("ul",null,this.searchResults.map((function(e){return n("li",{onClick:t.onSelectSymbol.bind(t,e.symbol)},n("strong",null,e.symbol)," - ",e.name)})));if(this.loading){e=n("dsc-spinner",null)}return[n("form",{onSubmit:this.onFindStock.bind(this)},n("input",{id:"stock-symbol",ref:function(e){return t.stockNameInput=e}}),n("button",{type:"submit"},"Find")),e]};Object.defineProperty(t,"style",{get:function(){return":host{font-family:sans-serif;border:2px solid var(--color-primary,#000);margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}form input{font:inherit;color:var(--color-primary,#000);padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid var(--color-primary,#000);background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff);cursor:pointer}form button:active,form button:hover{background:var(--color-primary-highlight,grey);border-color:var(--color-primary-highlight,grey)}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}ul{margin:0;padding:0;list-style:none}li{margin:.25rem 0;padding:.25rem;border:1px solid #ccc;cursor:pointer}li:active,li:hover{background:var(--color-primary,#000);color:var(--color-primary-inverse,#fff)}"},enumerable:true,configurable:true});return t}());var l=t("dsc_stock_price",function(){function t(t){e(this,t);this.stockInputValid=false;this.error="";this.loading=true}t.prototype.stockSymbolChanged=function(t,e){if(t!==e){this.stockUserInput=t;this.fetchStockPrice(t)}};t.prototype.componentDidLoad=function(){if(this.stockSymbol){this.stockInputValid=true;this.fetchStockPrice(this.stockSymbol);this.stockUserInput=this.stockSymbol}};t.prototype.onStockSymbolSelected=function(t){if(t.detail&&t.detail!==this.stockSymbol){this.stockSymbol=t.detail}};t.prototype.componentWillLoad=function(){console.log("componentWillLoad")};t.prototype.componentWillUpdate=function(){console.log("componentWillUpdate")};t.prototype.componentDidUpdate=function(){console.log("componentDidUpdate")};t.prototype.componentDidUnload=function(){console.log("componentDidUnload")};t.prototype.fetchStockPrice=function(t){var e=this;this.loading=true;fetch("https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol="+t+"&apikey="+s).then((function(t){return t.json()})).then((function(t){if(!t["Global Quote"]["05. price"]){throw new Error("Invalid!!")}e.error=null;e.fetchedPrice=+t["Global Quote"]["05. price"];e.loading=false})).catch((function(t){console.log(t);e.error=t.message;e.loading=false}))};t.prototype.onUserInput=function(t){this.stockUserInput=t.target.value;if(this.stockUserInput.trim()!==""){this.stockInputValid=true}else{this.stockInputValid=false}};t.prototype.onFetchStockPrice=function(t){t.preventDefault();this.stockSymbol=this.stockInput.value};t.prototype.hostData=function(){return{class:{error:this.error}}};t.prototype.__stencil_render=function(){var t=this;var e=n("p",null,"Please enter a stock symbol");if(this.fetchedPrice){e=n("p",null,"Price: $",this.fetchedPrice)}if(this.error){e=n("p",null,this.error)}if(this.loading){e=n("dsc-spinner",null)}return[n("form",{onSubmit:this.onFetchStockPrice.bind(this)},n("input",{id:"stock-symbol",ref:function(e){return t.stockInput=e},value:this.stockUserInput,onInput:this.onUserInput.bind(this)}),n("button",{type:"submit",disabled:!this.stockInputValid||this.loading},"Fetch")),n("div",null,e)]};Object.defineProperty(t.prototype,"el",{get:function(){return i(this)},enumerable:true,configurable:true});Object.defineProperty(t,"watchers",{get:function(){return{stockSymbol:["stockSymbolChanged"]}},enumerable:true,configurable:true});t.prototype.render=function(){return n(r,this.hostData(),this.__stencil_render())};Object.defineProperty(t,"style",{get:function(){return":host{font-family:sans-serif;border:2px solid #3b013b;margin:2rem;padding:1rem;display:block;width:20rem;max-width:100%}:host(.error){border-color:#e79804}form input{font:inherit;color:#3b013b;padding:.1rem .25rem;display:block;margin-bottom:.5rem}form button:focus,form input:focus{outline:none}form button{font:inherit;padding:.25rem .5rem;border:1px solid #3b013b;background:#3b013b;color:#fff;cursor:pointer}form button:active,form button:hover{background:#750175;border-color:#750175}form button:disabled{background:#ccc;border-color:#ccc;color:#fff;cursor:not-allowed}"},enumerable:true,configurable:true});return t}())}}}));