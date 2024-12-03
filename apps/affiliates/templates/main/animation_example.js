function moveBox() {
    const box = document.getElementById("box1");
    box.style.transform = "translateX(200px)";
    setTimeout(() => {
        box.style.transform = "translateX(0)";
    }, 1000);
}

function rotateBox() {
    const box = document.getElementById("box2");
    box.style.transform = "rotate(360deg)";
    setTimeout(() => {
        box.style.transform = "rotate(0)";
    }, 1000);
}

function changeColor() {
    const box = document.getElementById("box3");
    box.style.backgroundColor = "#ff0000";
    setTimeout(() => {
        box.style.backgroundColor = "#007bff";
    }, 1000);
}

function getLocation() {
    const locationElement = document.getElementById("location");
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                locationElement.textContent = `Latitude: ${latitude}, Longitude: ${longitude}`;
            },
            (error) => {
                locationElement.textContent = `Error: ${error.message}`;
            }
        );
    } else {
        locationElement.textContent = "Geolocation is not supported by this browser.";
    }
}

function speak() {
    const message = new SpeechSynthesisUtterance("Я люблю JavaScript!.");
    window.speechSynthesis.speak(message);
}

function getBatteryStatus() {
    const batteryStatusElement = document.getElementById("battery-status");
    if (navigator.getBattery) {
        navigator.getBattery().then((battery) => {
            const level = battery.level * 100;
            const charging = battery.charging ? "charging" : "not charging";
            batteryStatusElement.textContent = `Battery level: ${level}%, ${charging}`;
        });
    } else {
        batteryStatusElement.textContent = "Battery Status API is not supported by this browser.";
    }
}