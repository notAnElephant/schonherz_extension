document.getElementById("fillButton").addEventListener("click", () => {
    // old way (hardcoded values)
    // chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    //     console.log("sending script to fill table");
    //     chrome.scripting.executeScript({
    //         target: { tabId: tabs[0].id },
    //         files: ["content.js"]
    //     });
    // });

    //new way (sending message to background.js)
    console.log("fill button clicked");
    chrome.runtime.sendMessage({ action: "fillTable" });
});

document.getElementById("authButton").addEventListener("click", () => {
    console.log("auth button clicked");
    chrome.runtime.sendMessage({ action: "authenticate" });
});