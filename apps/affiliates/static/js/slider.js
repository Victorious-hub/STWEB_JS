class Slider {
    constructor(sliderContainer, config = {}) {
        this.slider = sliderContainer.querySelector("#slider");
        this.arrowLeft = sliderContainer.querySelector(".arrow-left");
        this.arrowRight = sliderContainer.querySelector(".arrow-right");
        this.slides = sliderContainer.querySelectorAll(".slider-image");
        this.bottom = sliderContainer.querySelector("#bottom");
        this.slideNumberDisplay = sliderContainer.querySelector(".slide-number");

        this.loop = config.loop ?? true;
        this.navs = config.navs ?? true;
        this.pags = config.pags ?? true;
        this.auto = config.auto ?? false;
        this.stopMouseHover = config.stopMouseHover ?? false;
        this.delay = (config.delay ?? 5) * 1000; 

        this.currentSlideIndex = 0;
        this.paginationCircles = [];
        this.sliderWidth = this.slider.clientWidth;
        this.autoSlideInterval = null;

        this.init();
    }

    init() {
        if (this.pags) this.createPagination();
        if (this.navs) {
            this.arrowLeft.addEventListener("click", () => this.previousSlide());
            this.arrowRight.addEventListener("click", () => this.nextSlide());
            this.arrowLeft.style.display = "block";
            this.arrowRight.style.display = "block";
        } else {
            this.arrowLeft.style.display = "none";
            this.arrowRight.style.display = "none";
        }
        this.updateSlideNumber();

        if (this.auto) {
            this.startAutoSlide();
            if (this.stopMouseHover) {
                this.slider.addEventListener("mouseover", () => this.stopAutoSlide());
                this.slider.addEventListener("mouseout", () => this.startAutoSlide());
            }
        }
    }

    createPagination() {
        this.slides.forEach((_, index) => this.createPaginationCircle(index));
        this.paginationCircles[0].classList.add("active");
        this.paginationCircles.forEach((circle, index) => {
            circle.addEventListener("click", () => this.changeSlide(index));
        });
    }

    createPaginationCircle(index) {
        if (index === 0) {
            this.bottom.innerHTML = ""; 
            this.paginationCircles = [];
        }

        const div = document.createElement("div");
        div.className = "pagination-circle";
        this.bottom.appendChild(div);
        this.paginationCircles.push(div);
    }
    

    addActiveClass() {
        if (this.pags) this.paginationCircles[this.currentSlideIndex].classList.add("active");
    }

    removeActiveClass() {
        if (this.pags) this.paginationCircles[this.currentSlideIndex].classList.remove("active");
    }

    updateSlideNumber() {
        if (this.slideNumberDisplay) {
            this.slideNumberDisplay.textContent = `${this.currentSlideIndex + 1}/${this.slides.length}`;
        }
    }

    showSlide() {
        this.slider.style.transform = `translateX(-${this.currentSlideIndex * this.sliderWidth}px)`;
    }

    changeSlide(slideIndex) {
        this.removeActiveClass();
        this.currentSlideIndex = slideIndex;
        this.addActiveClass();
        this.showSlide();
        this.updateSlideNumber();
    }

    nextSlide() {
        let newSlideIndex = this.currentSlideIndex + 1;
        if (newSlideIndex > this.slides.length - 1) {
            newSlideIndex = this.loop ? 0 : this.slides.length - 1;
        }
        this.changeSlide(newSlideIndex);
    }

    previousSlide() {
        let newSlideIndex = this.currentSlideIndex - 1;
        if (newSlideIndex < 0) {
            newSlideIndex = this.loop ? this.slides.length - 1 : 0;
        }
        this.changeSlide(newSlideIndex);
    }

    startAutoSlide() {
        this.autoSlideInterval = setInterval(() => this.nextSlide(), this.delay);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlideInterval);
    }

    updateSlideInterval(newInterval) {
        this.delay = newInterval * 1000;
        this.stopAutoSlide();
        this.startAutoSlide();
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const sliderContainer = document.getElementById("slider-container");
    let sliderConfig = {
        loop: true,
        navs: true,
        pags: true,
        auto: true,
        stopMouseHover: true,
        delay: 3
    };
    let slider = new Slider(sliderContainer, sliderConfig);

    const applySettingsButton = document.getElementById("apply-settings");

    applySettingsButton.addEventListener("click", () => {
        const newConfig = {
            loop: document.getElementById("loop").checked,
            navs: document.getElementById("navs").checked,
            pags: document.getElementById("pags").checked,
            auto: document.getElementById("auto").checked,
            stopMouseHover: document.getElementById("stop-mouse-hover").checked,
            delay: parseFloat(document.getElementById("delay").value) || 3
        };

        slider.stopAutoSlide();
        slider = new Slider(sliderContainer, newConfig);
    });
});

