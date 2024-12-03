Date.prototype.addHours = function(h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
}

let today = new Date();
let endDate;

const data = document.currentScript.dataset;
const userId = data.id;

if (userId != "None") {
    const storedEndDate = localStorage.getItem(`endDate_${userId}`);
    if (storedEndDate && today < new Date(storedEndDate)) {
        endDate = new Date(storedEndDate);
    } else {
        endDate = today.addHours(1);
        localStorage.setItem(`endDate_${userId}`, endDate);
    }
}

document.getElementById("end-date").innerHTML = endDate;

const inputs = document.querySelectorAll(".timer-box input");

const clock = () => {
    const nowDate = new Date();
    const diff = (endDate - nowDate) / 1000;

    if (diff < 0) return;
    inputs[0].value = Math.floor(diff / 3600 / 24);
    inputs[1].value = Math.floor(diff / 3600) % 24;
    inputs[2].value = Math.floor(diff / 60) % 60;
    inputs[3].value = Math.floor(diff) % 60;
}

clock();

setInterval(() => {
    clock();
}, 1000);