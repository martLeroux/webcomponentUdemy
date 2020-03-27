/* eslint-disable */
/* tslint:disable */
/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */


import { HTMLStencilElement, JSXBase } from '@stencil/core/internal';


export namespace Components {
  interface DscSideDrawer {
    'open': boolean;
    'title': string;
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
}

declare global {


  interface HTMLDscSideDrawerElement extends Components.DscSideDrawer, HTMLStencilElement {}
  var HTMLDscSideDrawerElement: {
    prototype: HTMLDscSideDrawerElement;
    new (): HTMLDscSideDrawerElement;
  };

  interface HTMLMyComponentElement extends Components.MyComponent, HTMLStencilElement {}
  var HTMLMyComponentElement: {
    prototype: HTMLMyComponentElement;
    new (): HTMLMyComponentElement;
  };
  interface HTMLElementTagNameMap {
    'dsc-side-drawer': HTMLDscSideDrawerElement;
    'my-component': HTMLMyComponentElement;
  }
}

declare namespace LocalJSX {
  interface DscSideDrawer {
    'open'?: boolean;
    'title'?: string;
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

  interface IntrinsicElements {
    'dsc-side-drawer': DscSideDrawer;
    'my-component': MyComponent;
  }
}

export { LocalJSX as JSX };


declare module "@stencil/core" {
  export namespace JSX {
    interface IntrinsicElements {
      'dsc-side-drawer': LocalJSX.DscSideDrawer & JSXBase.HTMLAttributes<HTMLDscSideDrawerElement>;
      'my-component': LocalJSX.MyComponent & JSXBase.HTMLAttributes<HTMLMyComponentElement>;
    }
  }
}


