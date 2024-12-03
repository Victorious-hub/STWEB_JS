document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("birthdate-form");
    const messageDiv = document.getElementById("message");

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const birthdateInput = document.getElementById("birthdate").value;

        if (!birthdateInput) {
            alert("Please enter your birthdate.");
            return;
        }

        const birthdate = new Date(birthdateInput);
        const today = new Date();
        const age = calculateAge(birthdate, today);
        const dayOfWeek = birthdate.toLocaleDateString("en-US", { weekday: "long" });

        if (age >= 18) {
            messageDiv.innerHTML = `
                <p>You are <strong>${age}</strong> years old.</p>
                <p>Your birthdate was on a <strong>${dayOfWeek}</strong>.</p>
            `;
        } else {
            alert("You must have parental consent to use this website.");
            messageDiv.innerHTML = `
                <p>You are <strong>${age}</strong> years old.</p>
                <p>Your birthdate was on a <strong>${dayOfWeek}</strong>.</p>
                <p>Parental consent is required.</p>
            `;
        }
    });

    function calculateAge(birthdate, today) {
        let age = today.getFullYear() - birthdate.getFullYear();
        const monthDifference = today.getMonth() - birthdate.getMonth();
        if (
            monthDifference < 0 ||
            (monthDifference === 0 && today.getDate() < birthdate.getDate())
        ) {
            age--;
        }
        return age;
    }
});
