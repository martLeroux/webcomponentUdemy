/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface DscSideDrawer {
    'open': () => Promise<void>;
    'opened': boolean;
    'title': string;
  }
  interface DscSpinner {}
  interface DscStockFinder {}
  interface DscStockPrice {
    'stockSymbol': string;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first': string;
    /**
    * The last name
    */
    'last': string;
    /**
    * The middle name
    */
    'middle': string;
  }
  interface UcTooltip {
    'text': string;
  }
}

declare global {


  interface HTMLDscSideDrawerElement extends Components.DscSideDrawer, HTMLStencilElement {}
  var HTMLDscSideDrawerElement: {
    prototype: HTMLDscSideDrawerElement;
    new (): HTMLDscSideDrawerElement;
  };

  interface HTMLDscSpinnerElement extends Components.DscSpinner, HTMLStencilElement {}
  var HTMLDscSpinnerElement: {
    prototype: HTMLDscSpinnerElement;
    new (): HTMLDscSpinnerElement;
  };

  interface HTMLDscStockFinderElement extends Components.DscStockFinder, HTMLStencilElement {}
  var HTMLDscStockFinderElement: {
    prototype: HTMLDscStockFinderElement;
    new (): HTMLDscStockFinderElement;
  };

  interface HTMLDscStockPriceElement extends Components.DscStockPrice, HTMLStencilElement {}
  var HTMLDscStockPriceElement: {
    prototype: HTMLDscStockPriceElement;
    new (): HTMLDscStockPriceElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };

  interface HTMLUcTooltipElement extends Components.UcTooltip, HTMLStencilElement {}
  var HTMLUcTooltipElement: {
    prototype: HTMLUcTooltipElement;
    new (): HTMLUcTooltipElement;
  };
  interface HTMLElementTagNameMap {
    'dsc-side-drawer': HTMLDscSideDrawerElement;
    'dsc-spinner': HTMLDscSpinnerElement;
    'dsc-stock-finder': HTMLDscStockFinderElement;
    'dsc-stock-price': HTMLDscStockPriceElement;
    'my-component': HTMLMyComponentElement;
    'uc-tooltip': HTMLUcTooltipElement;
  }
}

declare namespace LocalJSX {
  interface DscSideDrawer {
    'opened'?: boolean;
    'title'?: string;
  }
  interface DscSpinner {}
  interface DscStockFinder {
    'onDscSymbolSelected'?: (event: CustomEvent<string>) => void;
  }
  interface DscStockPrice {
    'stockSymbol'?: string;
  }
  interface MyComponent {
    /**
    * The first name
    */
    'first'?: string;
    /**
    * The last name
    */
    'last'?: string;
    /**
    * The middle name
    */
    'middle'?: string;
  }
  interface UcTooltip {
    'text'?: string;
  }

  interface IntrinsicElements {
    'dsc-side-drawer': DscSideDrawer;
    'dsc-spinner': DscSpinner;
    'dsc-stock-finder': DscStockFinder;
    'dsc-stock-price': DscStockPrice;
    'my-component': MyComponent;
    'uc-tooltip': UcTooltip;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'dsc-side-drawer': LocalJSX.DscSideDrawer & JSXBase.HTMLAttributes<HTMLDscSideDrawerElement>;
      'dsc-spinner': LocalJSX.DscSpinner & JSXBase.HTMLAttributes<HTMLDscSpinnerElement>;
      'dsc-stock-finder': LocalJSX.DscStockFinder & JSXBase.HTMLAttributes<HTMLDscStockFinderElement>;
      'dsc-stock-price': LocalJSX.DscStockPrice & JSXBase.HTMLAttributes<HTMLDscStockPriceElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
      'uc-tooltip': LocalJSX.UcTooltip & JSXBase.HTMLAttributes<HTMLUcTooltipElement>;
    }
  }
}


