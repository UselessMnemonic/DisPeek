/**
 * Queries the document for a single element whose classes contain the given string
 * @param {Document} document The document
 * @param {HTMLElement} ctx The node from which to search
 * @param {string} classname The desired classname, contained in the result
 * @returns {HTMLElement | null} The result element, or null
 */
 function querySelectorContaining(document, ctx, classname) {
    const result = document.evaluate(`//*[contains(@class, ${classname})]`, ctx);
    return result.iterateNext();
}

/**
 * Queries the document for a single element whose role contain the given string
 * @param {Document} document The document
 * @param {HTMLElement} ctx The node from which to search
 * @param {string} role The desired role, contained in the result
 * @returns {HTMLElement | null} The result element, or null
 */
function queryRoleContaining(document, ctx, role) {
    const result = document.evaluate(`//*[contains(@role, ${role})]`, ctx);
    return result.iterateNext();
}

/**
 * Runs when the main content element changes
 * @param {HTMLElement} elem The element observing the change
 * @param {Event} event The event parameters
 */
function whenMainContentChanges(elem, event) {
    alert('Main content changed!');
    const channelTextArea = querySelectorContaining(document, elem, "channelTextArea");
    
    if (channelTextArea !== null) {

        const textbox = queryRoleContaining(document, channelTextArea, "textbox");
        const buttons = querySelectorContaining(document, channelTextArea, "buttons");

        textbox.style.color = 'rgb(199, 255, 255) !important';
        textbox.ariaLabel += ' (ENCRYPTED)';
    }
}

// main
document.onload
