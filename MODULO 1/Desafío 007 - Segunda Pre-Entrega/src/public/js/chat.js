const socket = io();
// DOM
const form = document.getElementById('chat-form');
const inputTextArea = document.getElementById('textArea');
inputTextArea.disabled = true;
const modalForm = document.getElementById('modal-form');
const inputUsername = document.getElementById('inputNickName');
const modal = document.getElementById('modal-container');
const historyContainer = document.getElementById('chat-history');
// Utils
const toggleModal = () => {
    modal.classList.toggle('display-none');
};
const clientTime = (msgDate) => {
    const date = new Date(msgDate);
    const hours = date.getHours().toString().padStart(2, '0'); 
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
// Simple client side username validation:
let username = '';
const setUser = (user) => {
    userTrim = user.trim();

    if(userTrim.length < 1){
        alert('Empty username');
        return
    };

    username = userTrim;
    inputTextArea.disabled = false;
    toggleModal();
};
modalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    setUser(inputUsername.value);
    modalForm.reset();
});
// Bring chat history on connection:
const autoScroll = () => {
    historyContainer.scrollTo({
        top: historyContainer.scrollHeight,
        behavior: 'smooth'
    });
};
socket.on('history', (data) => {
    data.forEach((msg) => {
        let currentMsg = `
        <div class="msg">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${clientTime(msg.time)}</p>
            </div>
        </div>`;
        historyContainer.innerHTML += currentMsg;
    });
    autoScroll();
});
// Send message workflow:
// Actions
const sendMessage = (username) => {
    const currentMessage = inputTextArea.value;
    socket.emit('message', {
        user: username,
        text: currentMessage
    });
};
// Listeners
// Op1: Submit button
form.addEventListener('submit', (e) => {
    e.preventDefault();
    sendMessage(username);
    form.reset();
});
// Op2: Press enter
inputTextArea.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey){ 
        e.preventDefault();
        sendMessage(username);
        form.reset();
    };
});
// Recive latest message:
socket.on('currentMessage', (msg) => {
    if(msg.user === username){
        let currentMsg = `
        <div class="msg msg-user">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${clientTime(msg.time)}</p>
            </div>
        </div>`;
        historyContainer.innerHTML += currentMsg;
        autoScroll();
    } else {
        let currentMsg = `
        <div class="msg">
            <h4 class="msg-owner">${msg.user} dice: </h4> 
            <div class="msg-bg">
                <p class="msg-text">${msg.message}</p> 
                <p class="msg-time">${clientTime(msg.time)}</p>
            </div>
        </div>`;
        historyContainer.innerHTML += currentMsg;
    };
});