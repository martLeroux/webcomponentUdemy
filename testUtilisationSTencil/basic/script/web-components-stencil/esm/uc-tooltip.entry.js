import { r as registerInstance, h } from './core-d8a25c48.js';

const Tooltip = class {
    constructor(hostRef) {
        registerInstance(this, hostRef);
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
    static get style() { return ":host{position:relative}#tooltip-icon{background:#000;color:#fff;padding:.15rem .45rem;border-radius:50%;margin-left:.5rem}#tooltip-text{position:absolute;top:1.5rem;left:1rem;width:8rem;background:#000;color:#fff;padding:.5rem;border-radius:3px;-webkit-box-shadow:0 2px 6px rgba(0,0,0,.26);box-shadow:0 2px 6px rgba(0,0,0,.26)}"; }
};

export { Tooltip as uc_tooltip };
