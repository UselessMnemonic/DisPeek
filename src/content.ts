import { logger } from "./logger";

/**
 * Queries the document for a single element whose classes contain the given string
 * @param document The document
 * @param ctx The node from which to search
 * @param classname The desired classname, contained in the result
 * @returns The result element, or null
 */
 function querySelectorContaining(document: Document, ctx: Node, classname: string): HTMLElement | null {
    const result = document.evaluate(`//*[contains(@class, ${classname})]`, ctx);
    return result.iterateNext() as HTMLElement | null;
}

/**
 * Queries the document for a single element whose role contain the given string
 * @param document The document
 * @param ctx The node from which to search
 * @param role The desired role, contained in the result
 * @returns The result element, or null
 */
function queryRoleContaining(document: Document, ctx: Node, role: string): HTMLElement | null {
    const result = document.evaluate(`//*[contains(@role, ${role})]`, ctx);
    return result.iterateNext() as HTMLElement | null;
}

/**
 * Runs when the main content element changes
 * @param elem The element observing the change
 * @param event The event parameters
 */
function whenMainContentChanges(elem: HTMLElement, event: Event) {
    const channelTextArea = querySelectorContaining(document, elem, "channelTextArea");
    
    if (channelTextArea !== null) {

        const textbox = queryRoleContaining(document, channelTextArea, "textbox");
        const buttons = querySelectorContaining(document, channelTextArea, "buttons");

        if (textbox !== null) {
            textbox.style.color = 'rgb(199, 255, 255) !important';
            textbox.ariaLabel += ' (ENCRYPTED)';
        }
    }
}

// main
logger.log("Content script loaded!")

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.url !== undefined) logger.log("URL changed!");
});
