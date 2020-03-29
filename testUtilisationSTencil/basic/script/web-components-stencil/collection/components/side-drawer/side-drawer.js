import { h } from "@stencil/core";
export class SideDrawer {
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
        let mainContent = h("slot", null);
        if (this.showContactInfo) {
            mainContent = (h("div", { id: "contact-information" },
                h("h2", null, "Contact Information"),
                h("p", null, "You can reach us via phone or email."),
                h("ul", null,
                    h("li", null, "Phone: 514-654-8245"),
                    h("li", null,
                        "E-mail: ",
                        h("a", { href: "mailto:tintin_151@hotmail.com" }, "tintin_151@hotmail.com")))));
        }
        return [
            h("div", { class: "backdrop", onClick: this.onCloseDrawer.bind(this) }),
            h("aside", null,
                h("header", null,
                    h("h1", null, this.title),
                    h("button", { id: "close-button", onClick: this.onCloseDrawer.bind(this) }, "x")),
                h("section", { id: "tabs" },
                    h("button", { class: !this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'nav') }, "Navigation"),
                    h("button", { class: this.showContactInfo ? 'active' : '', onClick: this.onContentChange.bind(this, 'contact') }, "Contact")),
                h("main", null, mainContent))
        ];
    }
    static get is() { return "dsc-side-drawer"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./side-drawer.css"]
    }; }
    static get styleUrls() { return {
        "$": ["side-drawer.css"]
    }; }
    static get properties() { return {
        "title": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "title",
            "reflect": true
        },
        "opened": {
            "type": "boolean",
            "mutable": true,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": ""
            },
            "attribute": "opened",
            "reflect": true
        }
    }; }
    static get states() { return {
        "showContactInfo": {}
    }; }
    static get methods() { return {
        "open": {
            "complexType": {
                "signature": "() => Promise<void>",
                "parameters": [],
                "references": {},
                "return": "Promise<void>"
            },
            "docs": {
                "text": "",
                "tags": []
            }
        }
    }; }
}
