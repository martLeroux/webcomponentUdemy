export declare class SideDrawer {
    showContactInfo: boolean;
    title: string;
    opened: boolean;
    onCloseDrawer(): void;
    onContentChange(content: string): void;
    open(): void;
    render(): any[];
}
