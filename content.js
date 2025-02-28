function setInputValue(input, value) {
    input.value = value;

    // Create an event to notify the website of the change
    let event = new Event("input", {bubbles: true});
    input.dispatchEvent(event);
}

function isThursday(input) {
    let date = input.closest("tr").querySelector("td").querySelector("input").value;
    let day = new Date(date).getDay();
    return day === 4;
}

function fillTable() {
    //TODO doesn't calculate the correct number of hours for any day
    document.querySelectorAll("input[name$='.Start']").forEach(input => {
        if (input.value === ""
            && !isThursday(input)
            && !input.closest("tr").classList.contains("inverse"))
            setInputValue(input, "0900");
    });
    document.querySelectorAll("input[name$='.Finish']").forEach(input => {
        if (input.value === ""
            && !isThursday(input)
            && !input.closest("tr").classList.contains("inverse"))
            setInputValue(input, "1700");
    });
}

fillTable();