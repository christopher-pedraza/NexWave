const { sendButtonsMessage } = require('./index'); // Asegúrate de que la ruta sea correcta

// Define el número de teléfono del destinatario (con código de país, por ejemplo, '14155552671')
const recipientNumber = '528332666331'; // Reemplaza con el número de teléfono del destinatario

// Define la pregunta y las opciones del quiz
const question = '¿Cuál es tu color favorito?';
const buttons = ['Rojo', 'Verde', 'Azul', 'Amarillo'];

// Llama a la función para enviar el mensaje
sendButtonsMessage(recipientNumber, question, buttons)
    .then(() => console.log('Mensaje enviado correctamente'))
    .catch(err => console.error('Error al enviar el mensaje:', err));
