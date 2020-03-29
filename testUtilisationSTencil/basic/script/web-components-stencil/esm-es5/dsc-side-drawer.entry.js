import { r as registerInstance, h } from './core-d8a25c48.js';
var SideDrawer = /** @class */ (function () {
    function SideDrawer(hostRef) {
        registerInstance(this, hostRef);
    }
    SideDrawer.prototype.onCloseDrawer = function () {
        this.opened = false;
    };
    SideDrawer.prototype.onContentChange = function (content) {
        this.showContactInfo = content === 'contact';
    };
    SideDrawer.prototype.open = function () {
        this.opened = true;
        console.log('yo');
    };
    SideDrawer.prototype.render = function () {
        var mainContent = h("slot", null);
        if (this.showContactInfo) {
            mainContent = (h("div", { id: "contact-information" }, h("h2", null, "Contact Information"), h("p", null, "You can reach us via phone or email."), h("ul", null, h("li", null, "Phone: 514-654-8245"), h("li", null, "E-mail: ", h("a", { href: "mailto:tintin_151@hotmail.com" }, "tintin_151@hotmail.com")))));
        }
        return [
            h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
            h("aside", null, h("header", null, h("h1", null, this.title), h("button", { id: "close-button", onClick: this.onCloseDrawer.bind(this) }, "x")), h("section", { id: "tabs" }, h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'nav') }, "Navigation"), h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")), h("main", null, mainContent))
        ];
    };
    Object.defineProperty(SideDrawer, "style", {
        get: function () { return "aside{position:fixed;top:0;left:-100%;width:30rem;max-width:80%;height:100vh;background:#e9e9e9;-webkit-box-shadow:0 2px 8px rgba(0,0,0,.26);box-shadow:0 2px 8px rgba(0,0,0,.26);-webkit-transition:all .3s ease-out;transition:all .3s ease-out;z-index:100}:host([opened]) aside{left:0}:host([opened]) .backdrop{opacity:1;pointer-events:all}header{padding:1rem;background-color:#000}header h1{margin:0}header button,header h1{font-size:1.5rem;color:#fff}header button{position:absolute;top:0;right:0;padding:1rem;background:transparent;border:none}#tabs{display:-ms-flexbox;display:flex;-ms-flex-pack:center;justify-content:center;margin:1rem 0}#tabs button{width:30%;background:#fff;color:#000;text-align:center;border:1px solid #000;padding:.15rem 0}#tabs button.active,#tabs button:hover{background:#000;color:#fff}#tabs button:focus{outline:none}#contact-information{padding:0 1rem}.backdrop{position:fixed;top:0;left:0;width:100%;height:100vh;background:rgba(0,0,0,.75);z-index:10;opacity:0;-webkit-transition:all .3s ease-out;transition:all .3s ease-out;pointer-events:none}"; },
        enumerable: true,
        configurable: true
    });
    return SideDrawer;
}());
export { SideDrawer as dsc_side_drawer };
