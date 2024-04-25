export var a = 1;

declare global {
    interface Window {
        gameTextResize(): () => {};
    }
}