'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

const core = require('./core-38c9c5cc.js');

const SideDrawer = class {
    constructor(hostRef) {
        core.registerInstance(this, hostRef);
    }
    onCloseDrawer() {
        this.opened = false;
    }
    onContentChange(content) {
        this.showContactInfo = content === 'contact';
    }
    open() {
        this.opened = true;
        console.log('yo');
    }
    render() {
        let mainContent = core.h("slot", null);
        if (this.showContactInfo) {
            mainContent = (core.h("div", { id: "contact-information" }, core.h("h2", null, "Contact Information"), core.h("p", null, "You can reach us via phone or email."), core.h("ul", null, core.h("li", null, "Phone: 514-654-8245"), core.h("li", null, "E-mail: ", core.h("a", { href: "mailto:tintin_151@hotmail.com" }, "tintin_151@hotmail.com")))));
        }
        return [
            core.h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
            core.h("aside", null, core.h("header", null, core.h("h1", null, this.title), core.h("button", { id: "close-button", onClick: this.onCloseDrawer.bind(this) }, "x")), core.h("section", { id: "tabs" }, core.h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'nav') }, "Navigation"), core.h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")), core.h("main", null, mainContent))
        ];
    }
    static get style() { return "aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;background:#e9e9e9;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.26);box-shadow:0 2px 8px rgba(0,0,0,.26);-webkit-transition:all .3s ease-out;transition:all .3s ease-out;z-index:100}:host([opened]) aside{left:0}:host([opened]) .backdrop{opacity:1;pointer-events:all}header{padding:1rem;background-color:#000}header h1{margin:0}header button,header h1{font-size:1.5rem;color:#fff}header button{position:absolute;top:0;right:0;padding:1rem;background:transparent;border:none}#tabs{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;margin:1rem 0}#tabs button{width:30%;background:#fff;color:#000;text-align:center;border:1px solid #000;padding:.15rem 0}#tabs button.active,#tabs button:hover{background:#000;color:#fff}#tabs button:focus{outline:none}#contact-information{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0,0,0,.75);z-index:10;opacity:0;-webkit-transition:all .3s ease-out;transition:all .3s ease-out;pointer-events:none}"; }
};

exports.dsc_side_drawer = SideDrawer;
