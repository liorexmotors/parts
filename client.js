document.addEventListener('DOMContentLoaded', () => {
    const messageBox = document.getElementById('message');
    const chat = document.getElementById('chat');
    const modal = document.getElementById('registerModal');
    const registerForm = document.getElementById('registerForm');
    const sendBtn = document.getElementById('sendBtn');
    let isRegistered = false;
    let userRequests = [];
    let isFirstInput = true;

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
        if (!isRegistered && isFirstInput && messageBox.value.trim().length > 0) {
            showModal();
            isFirstInput = false;
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
            
            const confirmBtn = document.createElement('button');
            confirmBtn.textContent = 'אשר העברת הבקשה למרכזי שירות';
            confirmBtn.classList.add('confirm-btn');
            confirmBtn.onclick = () => confirmRequest(userMessage);
            
            chat.appendChild(confirmBtn);
            messageBox.value = '';
        }
    }

    function confirmRequest(request) {
        addMessage('הבקשה הועברה למרכזי השירות הרלוונטיים. הם יחזרו אליך בהקדם.');
        displayUserRequests();
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

    // Initially hide the modal
    hideModal();
});
