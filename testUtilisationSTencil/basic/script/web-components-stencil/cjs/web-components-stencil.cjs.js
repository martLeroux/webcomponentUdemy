'use strict';

const core = require('./core-38c9c5cc.js');

core.patchBrowser().then(options => {
  return core.bootstrapLazy([["dsc-stock-finder_2.cjs",[[1,"dsc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"dsc-stock-price",{"stockSymbol":[1025,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[32,"dscSymbolSelected","onStockSymbolSelected"]]]]],["dsc-side-drawer.cjs",[[1,"dsc-side-drawer",{"title":[513],"opened":[1540],"showContactInfo":[32],"open":[64]}]]],["my-component.cjs",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["uc-tooltip.cjs",[[1,"uc-tooltip",{"text":[1],"tooltipVisible":[32]}]]]], options);
});
