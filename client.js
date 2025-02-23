document.addEventListener('DOMContentLoaded', () => {
    const messageBox = document.getElementById('message');
    const chat = document.getElementById('chat');
    const modal = document.getElementById('registerModal');
    const registerForm = document.getElementById('registerForm');
    const sendBtn = document.getElementById('sendBtn');
    let isRegistered = false;
    let userRequests = [];

    function showModal() {
        modal.style.display = 'flex';
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
        const vehicleType = document.getElementById('vehicleType').value;

        if (fullName && email && phone && vehicleType) {
            isRegistered = true;
            hideModal();
            addMessage('ברוך הבא! אתה יכול להתחיל לשאול שאלות. נא לציין יצרן, דגם, שנת ייצור וצבע.');
        }
    });

    function sendMessage() {
        if (isRegistered && messageBox.value.trim()) {
            const userMessage = messageBox.value.trim();
            addMessage(userMessage, true);
            userRequests.push(userMessage);
            addMessage('הפרטים שלך יועברו לבעלי עסקים שיחזרו אליך עם הצעות.');
            messageBox.value = '';
            displayUserRequests();
        }
    }

    function displayUserRequests() {
        chat.innerHTML = ''; // Clear chat
        addMessage('היסטוריית הבקשות שלך:');
        userRequests.forEach(request => {
            addMessage(request, true);
        });
    }

    messageBox.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    sendBtn.addEventListener('click', sendMessage);
});
