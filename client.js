document.addEventListener('DOMContentLoaded', () => {
    const messageBox = document.getElementById('message');
    const chat = document.getElementById('chat');
    const modal = document.getElementById('registerModal');
    const registerForm = document.getElementById('registerForm');
    const sendBtn = document.getElementById('sendBtn');
    let isRegistered = false;

    function showModal() {
        modal.style.display = 'block';
    }

    function hideModal() {
        modal.style.display = 'none';
    }

    function addMessage(content, isUser = false) {
        const bubble = document.createElement('div');
        bubble.classList.add('bubble', isUser ? 'user' : 'system');
        bubble.textContent = content;
        chat.appendChild(bubble);
        chat.scrollTop = chat.scrollHeight;
    }

    messageBox.addEventListener('input', () => {
        if (!isRegistered && messageBox.value.length > 0) {
            showModal();
        }
    });

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const vehicle = document.getElementById('vehicle').value;

        if (fullName && email && phone && vehicle) {
            isRegistered = true;
            hideModal();
            addMessage('ברוך הבא! אתה יכול להתחיל לשאול שאלות.');
        }
    });

    function sendMessage() {
        if (isRegistered && messageBox.value.trim()) {
            const userMessage = messageBox.value.trim();
            addMessage(userMessage, true);
            addMessage('הפרטים שלך יועברו לבעלי עסקים שיחזרו אליך עם הצעות. לאשר?');
            
            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'אישור';
            confirmBtn.onclick = () => sendRequest(userMessage);
            chat.appendChild(confirmBtn);
            
            messageBox.value = '';
        }
    }

    messageBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendBtn.addEventListener('click', sendMessage);

    function sendRequest(message) {
        const fullName = document.getElementById('fullName').value;
        const email = document.getElementById('email').value;
        const phone = document.getElementById('phone').value;
        const vehicle = document.getElementById('vehicle').value;

        // כאן יש להוסיף את הלוגיקה לשליחת הנתונים לשרת
        console.log('שולח בקשה:', { fullName, email, phone, vehicle, message });

        addMessage('הפנייה נשלחה בהצלחה! בעלי עסקים יחזרו אליך בקרוב.');
    }
});
