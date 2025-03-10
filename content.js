function isThursday(input) {
    let date = input.closest("tr").querySelector("td").querySelector("input").value;
    let day = new Date(date).getDay();
    return day === 4;
}

//deprecated
function fillTable() {
    document.querySelectorAll("input[name$='.Start']").forEach(input => {
        if (!isThursday(input) && !input.closest("tr").classList.contains("inverse")) {
            input.value = "09:00";
            input.dispatchEvent(new Event("change", {bubbles: true}));
        }
    });

    document.querySelectorAll("input[name$='.Finish']").forEach(input => {
        if (!isThursday(input) && !input.closest("tr").classList.contains("inverse")) {
            input.value = "17:00";
            input.dispatchEvent(new Event("change", {bubbles: true}));
        }
    });
}

function fillTableWithEvents(events) {
    console.log("in the fillTableWithEvents function");
    //TODO tbd
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === "workEvents") {
        console.log("Received events from background.js");
        fillTableWithEvents(request.data);  // Fill the table with the event data
    }
});