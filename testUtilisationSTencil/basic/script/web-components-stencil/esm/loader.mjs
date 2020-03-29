import { a as patchEsm, b as bootstrapLazy } from './core-d8a25c48.js';

const defineCustomElements = (win, options) => {
  return patchEsm().then(() => {
    bootstrapLazy([["dsc-stock-finder_2",[[1,"dsc-stock-finder",{"searchResults":[32],"loading":[32]}],[1,"dsc-stock-price",{"stockSymbol":[1025,"stock-symbol"],"fetchedPrice":[32],"stockUserInput":[32],"stockInputValid":[32],"error":[32],"loading":[32]},[[32,"dscSymbolSelected","onStockSymbolSelected"]]]]],["dsc-side-drawer",[[1,"dsc-side-drawer",{"title":[513],"opened":[1540],"showContactInfo":[32],"open":[64]}]]],["my-component",[[1,"my-component",{"first":[1],"middle":[1],"last":[1]}]]],["uc-tooltip",[[1,"uc-tooltip",{"text":[1],"tooltipVisible":[32]}]]]], options);
  });
};

export { defineCustomElements };
