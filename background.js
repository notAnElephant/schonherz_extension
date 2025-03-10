function authenticateUser() {
    chrome.identity.getAuthToken({interactive: true}, function (token) {
        if (chrome.runtime.lastError) {
            console.error(chrome.runtime.lastError);
            return;
        }
        console.log("User authenticated, token:", token);
        this.token = token;
    });
}

function getWorkEventsAndSendThemToContentScript() {
    console.log("Getting work events");
    fetchGoogleCalendarEvents(this.token).then(function (events) {
        events = events.filter(event => event.start?.dateTime).sort((a, b) => new Date(a.start?.dateTime) - new Date(b.start?.dateTime));

        console.log(events);
        console.log("Total days worked this month: ", events.length);

        //TODO does not work
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            func: injectContentScript // This will ensure the content script runs
        });
        // Send the event data to the content script
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {type: "workEvents", data: events});
        });
    });
}

function injectContentScript() {
    console.log('Content script is now ready');
    // The content script can now be safely interacted with
}


function fetchGoogleCalendarEvents(token) {
    console.log("Fetching Google Calendar events with token: ", token);

    const workEventKeyWord = "meló";
    const now = new Date();

    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 2).toISOString();
    const lastDayOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59).toISOString();

    console.log("First day of month:", firstDayOfMonth);
    console.log("Last day of month:", lastDayOfMonth);

    const calendarUrl = `https://www.googleapis.com/calendar/v3/calendars/primary/events?timeMin=${firstDayOfMonth}&timeMax=${lastDayOfMonth}&singleEvents=true&q=${workEventKeyWord}`;

    return fetch(calendarUrl, {
        headers: {Authorization: `Bearer ${token}`}
    })
        .then(response => response.json())
        .then(data => data.items || []) // Return an empty array if no events exist
        .catch(error => {
            console.error("Error fetching calendar events:", error);
            return [];
        });
}


// Listen for messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === "authenticate") {
        authenticateUser();
    } else if (message.action === "fillTable") {
        getWorkEventsAndSendThemToContentScript();
    }
});