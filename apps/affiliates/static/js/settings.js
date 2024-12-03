document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("slider-settings-form");
    const backBtn = document.getElementById("back-btn");

    const settings = {
        auto: false,
        stopMouseHover: false,
        loop: true,
        delay: 5,
        navs: true,
        pags: true
    };

    // Загрузка настроек из localStorage
    function loadSettings() {
        const savedSettings = JSON.parse(localStorage.getItem("sliderSettings"));
        if (savedSettings) {
            Object.assign(settings, savedSettings);
        }
        form.auto.checked = settings.auto;
        form.stopMouseHover.checked = settings.stopMouseHover;
        form.loop.checked = settings.loop;
        form.delay.value = settings.delay;
        form.navs.checked = settings.navs;
        form.pags.checked = settings.pags;
    }

    // Сохранение настроек в localStorage
    function saveSettings() {
        const newSettings = {
            auto: form.auto.checked,
            stopMouseHover: form.stopMouseHover.checked,
            loop: form.loop.checked,
            delay: parseInt(form.delay.value, 10),
            navs: form.navs.checked,
            pags: form.pags.checked
        };
        localStorage.setItem("sliderSettings", JSON.stringify(newSettings));
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        saveSettings();
        alert("Settings saved!");
    });

    backBtn.addEventListener("click", () => {
        window.location.href = "main.html";
    });

    loadSettings();
});
