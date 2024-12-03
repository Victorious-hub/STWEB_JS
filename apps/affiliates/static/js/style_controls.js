document.addEventListener("DOMContentLoaded", function() {
    const styleToggle = document.getElementById("style-toggle");
    const styleControls = document.getElementById("style-controls");
    const fontSizeControl = document.getElementById("font-size");
    const textColorControl = document.getElementById("text-color");
    const backgroundColorControl = document.getElementById("background-color");

    styleToggle.addEventListener("change", function() {
        if (styleToggle.checked) {
            styleControls.style.display = "block";
        } else {
            styleControls.style.display = "none";
        }
    });

    fontSizeControl.addEventListener("input", function() {
        document.body.style.fontSize = fontSizeControl.value + "px";
    });

    textColorControl.addEventListener("input", function() {
        document.body.style.color = textColorControl.value;
    });

    backgroundColorControl.addEventListener("input", function() {
        document.body.style.backgroundColor = backgroundColorControl.value;
    });
});