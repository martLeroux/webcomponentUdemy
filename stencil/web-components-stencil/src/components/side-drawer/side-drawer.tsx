import { Component, h, Prop, State } from "@stencil/core";

@Component({
    tag: 'dsc-side-drawer',
    styleUrl: './side-drawer.css',
    shadow: true
})
export class SideDrawer {
    @State() showContactInfo: boolean;
    @Prop({reflect: true}) title: string;
    @Prop({reflect: true, mutable: true}) open: boolean;

    onCloseDrawer() {
        this.open = false;
    }

    onContentChange(content: string) {
        this.showContactInfo = content === 'contact';
    }


    render() {
        let mainContent = <slot />
        if (this.showContactInfo) {
            mainContent = (
                <div id="contact-information">
                    <h2>Contact Information</h2>
                    <p>You can reach us via phone or email.</p>
                    <ul>
                        <li>Phone: 514-654-8245</li>
                        <li>E-mail: <a href="mailto:tintin_151@hotmail.com">tintin_151@hotmail.com</a>
                        </li>
                    </ul>
                </div>
            )
        }
        
        
        return (
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button id="close-button" onClick={this.onCloseDrawer.bind(this)}>x</button>
                </header>
                <section id="tabs">
                    <button class={!this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'nav')}>Navigation</button>
                    <button class={this.showContactInfo ? 'active' : ''} onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
                </section>
                <main>
                    {mainContent}
                </main>
            </aside>
        );
    }
}