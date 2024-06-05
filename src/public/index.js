const socket = io();


let username = null;

if (!username) {
  Swal.fire({
    title: '¡Bienvenido!',
    text: 'Coloca tu nombre',
    input: 'text',
    inputValidator: (value) => {
      if (!value) return 'Nombre requerido';
    },
    allowOutsideClick: false, // Evitar que se cierre al hacer clic fuera del cartel
  })
    .then((input) => {
      username = input.value;
      socket.emit('newUser', username);
    });
}

const message = document.getElementById('message');
const btn = document.getElementById('send');
const output = document.getElementById('output');
const actions = document.getElementById('actions');

btn.addEventListener('click', () => {
  socket.emit('chat:message', {
    username,
    message: message.value,
  });
  message.value = '';
});


message.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    socket.emit('chat:message', {
      username,
      message: message.value,
    });
    message.value = '';
  }
});

socket.on('message', (msg) => {
  const chatRender = `<p><strong>${msg.username}</strong>: ${msg.message}</p>`;
  output.innerHTML += chatRender;
});

socket.on('msg', (msg) => {
  console.log(msg);
});

socket.on('newUser', (user) => {
  Toastify({
    text: `🟢 ${user} is logged in`,
    duration: 3000,
    gravity: 'top',
    position: 'right',
    stopOnFocus: true,
    style: {
      background: 'linear-gradient(to right, #00b09b, #96c93d)',
    },
  }).showToast();
});

message.addEventListener('keypress', () => {
  socket.emit('chat:typing', username);
});

socket.on('chat:typing', (user) => {
  actions.innerHTML = `<p>${user} está escribiendo un mensaje...</p>`;
});

function toggleMode() {
  const body = document.body;
  const modeToggle = document.getElementById('mode-toggle');
  
  // Cambiar entre light y dark mode
  if (body.classList.contains('dark-mode')) {
    body.classList.remove('dark-mode');
    modeToggle.innerHTML = '<i class="bx bxs-moon"></i>'; // Cambiar el icono a luna
  } else {
    body.classList.add('dark-mode');
    modeToggle.innerHTML = '<i class="bx bxs-sun"></i>'; // Cambiar el icono a sol
  }
}

// Agregar evento clic al botón para alternar los modos
document.getElementById('mode-toggle').addEventListener('click', toggleMode);