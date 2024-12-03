document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('new-contact-form');
    const errorMessage = document.getElementById('error-message');
    const phoneInput = form.querySelector('input[name="phone"]');
    const urlInput = form.querySelector('input[name="url"]');
    const addButton = document.createElement('button');
    
    addButton.textContent = "Add to Table";
    addButton.type = "button";
    form.appendChild(addButton);

    const isValidPhone = (phone) => {
        const phoneRegex = /^(8|(\+375))\s?\(?0?29\)?\s?\d{3}[-\s]?\d{2}[-\s]?\d{2}$/;
        return phoneRegex.test(phone);
    };

    const isValidURL = (url) => {
        const urlRegex = /^(http:\/\/|https:\/\/).+\.(php|html)$/;
        return urlRegex.test(url);
    };

    addButton.addEventListener('click', () => {
        let isValid = true;
        errorMessage.textContent = "";

        if (!isValidPhone(phoneInput.value)) {
            phoneInput.classList.add('invalid');
            errorMessage.textContent += "Invalid phone number. ";
            isValid = false;
        } else {
            phoneInput.classList.remove('invalid');
            phoneInput.classList.add('valid');
        }

        if (!isValidURL(urlInput.value)) {
            urlInput.classList.add('invalid');
            errorMessage.textContent += "Invalid URL. ";
            isValid = false;
        } else {
            urlInput.classList.remove('invalid');
            urlInput.classList.add('valid');
        }

        if (isValid) {
            const formData = new FormData(form);
            fetch('/add_contact/', {
                method: 'POST',
                body: formData,
                headers: {
                    'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value,
                },
            })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        alert('Contact added successfully!');
                        location.reload();
                    } else {
                        errorMessage.textContent = data.error || "Error adding contact.";
                    }
                })
                .catch(err => {
                    console.error(err);
                    errorMessage.textContent = "Unexpected error occurred.";
                });
        }
    });
});
