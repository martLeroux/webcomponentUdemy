import { h } from "@stencil/core";
export class Tooltip {
    constructor() {
        this.tooltipVisible = false;
    }
    onToggleTooltip() {
        this.tooltipVisible = !this.tooltipVisible;
    }
    render() {
        let tooltip = null;
        if (this.tooltipVisible) {
            tooltip = h("div", { id: "tooltip-text" }, this.text);
        }
        return [
            h("slot", null),
            h("span", { id: "tooltip-icon", onClick: this.onToggleTooltip.bind(this) }, "?"),
            tooltip
        ];
    }
    static get is() { return "uc-tooltip"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() { return {
        "$": ["./tooltip.css"]
    }; }
    static get styleUrls() { return {
        "$": ["tooltip.css"]
    }; }
    static get properties() { return {
        "text": {
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
            "attribute": "text",
            "reflect": false
        }
    }; }
    static get states() { return {
        "tooltipVisible": {}
    }; }
}
