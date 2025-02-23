const messageBox = document.getElementById('message');
const chat = document.getElementById('chat');
const modal = document.getElementById('registerModal');
const registerBtn = document.getElementById('registerBtn');
let isRegistered = false;

messageBox.addEventListener('input', () => {
    if (!isRegistered && messageBox.value.length > 0) {
        modal.style.display = 'block';
    }
});

registerBtn.addEventListener('click', () => {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const vehicle = document.getElementById('vehicle').value;

    if (fullName && email && phone && vehicle) {
        isRegistered = true;
        modal.style.display = 'none';
    }
});

messageBox.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && isRegistered && messageBox.value.trim()) {
        const userMessage = messageBox.value;
        chat.innerHTML += `<div class="bubble user">${userMessage}</div>`;
        chat.innerHTML += `<div class="bubble system">הפרטים שלך יועברו לבעלי עסקים שיחזרו אליך עם הצעות. לאשר?</div>`;
        chat.innerHTML += `<button onclick="sendRequest('${userMessage}')">אישור</button>`;
        messageBox.value = '';
    }
});

function sendRequest(message) {
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const vehicle = document.getElementById('vehicle').value;

    fetch('/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullName, email, phone, vehicle, message })
    }).then(() => {
        chat.innerHTML += `<div class="bubble system">הפנייה נשלחה בהצלחה! בעלי עסקים יחזרו אליך בקרוב.</div>`;
    });
}

const style = document.createElement('style');
style.innerHTML = `
    .bubble { padding: 10px; margin: 5px; border-radius: 10px; max-width: 70%; }
    .user { background: #DCF8C6; float: right; }
    .system { background: #E0E0E0; float: left; }
`;
document.head.appendChild(style);
