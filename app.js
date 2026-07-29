// Replace this with your actual Cloudflare Worker URL
const API_URL = "https://student-enroll-api.chatsree9.workers.dev"; 

document.getElementById('enrollForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const course = document.getElementById('course').value;
    const messageEl = document.getElementById('message');
    const submitBtn = document.getElementById('submitBtn');

    // Reset feedback UI
    messageEl.textContent = "";
    messageEl.className = "";
    submitBtn.disabled = true;
    submitBtn.textContent = "Registering...";

    try {
        const response = await fetch(`${API_URL}/enroll`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, course })
        });

        const data = await response.json();

        if (response.ok) {
            messageEl.textContent = data.message;
            messageEl.className = "success";
            document.getElementById('enrollForm').reset();
        } else {
            messageEl.textContent = data.error || "An error occurred.";
            messageEl.className = "error";
        }
    } catch (error) {
        messageEl.textContent = "Could not connect to the server.";
        messageEl.className = "error";
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = "Register";
    }
});
