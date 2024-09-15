const { sendButtonsMessage } = require('./index'); // Asegúrate de que la ruta sea correcta

// Define el número de teléfono del destinatario (con código de país, por ejemplo, '14155552671')
const recipientNumber = '528332666331'; // Reemplaza con el número de teléfono del destinatario

// Define la pregunta y las opciones del quiz
const question = '👋 ¡Hola, soy Banorte Buddy! Estoy aquí para ayudarte con tus necesidades financieras. Utiliza los botones interactivos para continuar o haz clic en el ícono de llamada para conectar con uno de nuestros asesores.';
const buttons = ['Chat de dudas', 'Crear una cuenta', 'Contactar asesor 📞'];

// Llama a la función para enviar el mensaje
sendButtonsMessage(recipientNumber, question, buttons)
    .then(() => console.log('Mensaje enviado correctamente'))
    .catch(err => console.error('Error al enviar el mensaje:', err));
