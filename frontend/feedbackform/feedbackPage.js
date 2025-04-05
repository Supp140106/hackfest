document.addEventListener("DOMContentLoaded", () => {
    const starContainers = document.querySelectorAll(".stars");
    const themeToggle = document.getElementById("theme-toggle");
    const submitBtn = document.querySelector(".submit-btn");
    const comments = document.getElementById("comments");

    const ratings = {}; // Store each question's rating

    starContainers.forEach(container => {
        const questionId = container.dataset.question;

        for (let i = 1; i <= 5; i++) {
            let star = document.createElement("span");
            star.innerHTML = "★";
            star.dataset.value = i;
            container.appendChild(star);
        }

        container.addEventListener("click", (event) => {
            if (event.target.tagName === "SPAN") {
                const rating = parseInt(event.target.dataset.value);
                ratings[questionId] = rating; // Save the rating
                updateStars(container, rating);
            }
        });

        container.addEventListener("mouseover", (event) => {
            if (event.target.tagName === "SPAN") {
                const value = parseInt(event.target.dataset.value);
                updateStars(container, value);
            }
        });

        container.addEventListener("mouseleave", () => {
            const questionId = container.dataset.question;
            const savedRating = ratings[questionId] || 0;
            updateStars(container, savedRating);
        });
    });

    function updateStars(container, value) {
        const stars = container.querySelectorAll("span");
        stars.forEach(star => {
            star.classList.toggle("active", parseInt(star.dataset.value) <= value);
        });
    }

    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
        themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀" : "🌙";
    });

    submitBtn.addEventListener("click", async () => {
        const feedbackArray = [];
        for (let i = 1; i <= 5; i++) {
            feedbackArray.push({ stars: ratings[i] || 0 });
        }

        const payload = {
            employee_name: "Rishu", // You can fetch this dynamically
            employee_id: "EMP123", // Replace with real employee ID
            feedbacks: feedbackArray,
            comment: comments.value,
            status: "submitted"
        };

        try {
            const response = await fetch("http://localhost:3000/feedback/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                alert("Feedback submitted successfully!");
            } else {
                const error = await response.json();
                alert("Submission failed: " + error.message);
            }
        } catch (err) {
            console.error(err);
            alert("An error occurred. Please try again.");
        }
    });
});