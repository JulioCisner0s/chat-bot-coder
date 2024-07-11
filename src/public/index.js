console.log('JS del cliente');
const title = document.getElementById('title-welcome');
const chatBox = document.getElementById('send');
const socket = io();
let user = '';

Swal.fire({
    title: 'Ingrese NickName',
    input: 'text',
    text: 'Para ingresar al chat identificarse',
    allowOutsideClick: false,
    inputValidator: (value) => {
        return !value && 'El nickName es requerido';
    }
}).then((result) => {
    user = result.value
    title.innerHTML = `Bienvenidos ${user}`;
    socket.emit('newUser', { user });
});

chatBox.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        socket.emit('mensaje', { user, mensaje: event.target.value });
        chatBox.value = ''
    }
})

socket.on('conversacion', (data) => {
    const contenedorChat = document.getElementById('#contenedor-chat');
    contenedorChat.innerHTML = ''
    data.forEach(chat => {
        const div = document.createElement('div');
        const nombre = document.createElement('p');
        const mensaje = document.createElement('p');
        nombre.innerText = chat.user + ': ';
        mensaje.innerText = chat.mensaje + '<br>';
        div.appendChild(nombre);
        div.appendChild(mensaje);
        contenedorChat.appendChild(div);
    })
})