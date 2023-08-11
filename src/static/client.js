const socket = io();

const form = document.getElementById('form');
const myname = document.getElementById('myname');
const message = document.getElementById('message');
const messageArea = document.getElementById('messageArea');

form.addEventListener('submit', (e) => {
  e.preventDefault();

  if (message.value) {
    const username = myname.value;
    const chat = message.value;
    socket.emit('send message', { username, message: chat });
    message.value = '';
  }
});

socket.on('receive message', (message) => {
  const messageElement = document.createElement('p');
  messageElement.textContent = message;
  messageArea.appendChild(messageElement);
});
