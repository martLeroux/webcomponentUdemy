'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-38c9c5cc.js');

function format(first, middle, last) {
    return ((first || '') +
        (middle ? ` ${middle}` : '') +
        (last ? ` ${last}` : ''));
}

const MyComponent = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    getText() {
        return format(this.first, this.middle, this.last);
    }
    render() {
        return core.h("div", null, "Hello, World! I'm ", this.getText());
    }
    static get style() { return ""; }
};

exports.my_component = MyComponent;
