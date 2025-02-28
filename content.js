function isThursday(input) {
    let date = input.closest("tr").querySelector("td").querySelector("input").value;
    let day = new Date(date).getDay();
    return day === 4;
}

document.querySelectorAll("input[name$='.Start']").forEach(input => {
    if (!isThursday(input) && !input.closest("tr").classList.contains("inverse")) {
        input.value = "09:00";
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }
});

document.querySelectorAll("input[name$='.Finish']").forEach(input => {
    if (!isThursday(input) && !input.closest("tr").classList.contains("inverse")) {
        input.value = "17:00";
        input.dispatchEvent(new Event("change", { bubbles: true }));
    }
});