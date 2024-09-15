const express = require("express");
const axios = require("axios");
const multer = require('multer');
const app = express();

const phoneNumberId = "391623854042683"; // Reemplaza con tu ID de número de teléfono
const accessToken = "EAAHRUwjl9O4BO92yZA12ol9wzRzTtrTluxittTITEnKrvgFF9Tw3XcopnNk8745Jnx127Nlr3etvXOLCHzETLxDmXF5PRNGQOiFX9rZAtRUDw7wZAo4r7n2DB3ScoSV2KVcmhBmqKe1A3kphojumuy2fxzpTBx59O3UqeaeGqZBRz1eoVERnkS2f6YYbfag859gb9NXixEKZAplu3Rczk9QRWQUoZD"; // Reemplaza con tu token de acceso
const verificationToken = "mi-token-de-verificacion-secreto"; // Esto debe coincidir con el token que ingresaste en Meta
const targetNumber = "528332666331";

var estadoQuiz = 0;
var estadoCreacionCuenta = 0;

// Configuración de multer para manejar archivos
const upload = multer({ storage: multer.memoryStorage() });

// Ruta para el Webhook de verificación
app.get("/webhook", (req, res) => {
    const mode = req.query["hub.mode"];
    const token = req.query["hub.verify_token"];
    const challenge = req.query["hub.challenge"];

    if (mode && token === verificationToken) {
        console.log("Webhook verificado correctamente");
        res.status(200).send(challenge);
    } else {
        res.sendStatus(403);
    }
});

app.use(express.json());
app.post("/webhook", upload.array('files'), (req, res) => {
    try {
        console.log("Request body:", req.body);

        if (!req.body || !req.body.entry || !Array.isArray(req.body.entry) || req.body.entry.length === 0) {
            console.log("No entry data found");
            return res.sendStatus(400);
        }

        const entry = req.body.entry[0];
        if (!entry.changes || !Array.isArray(entry.changes) || entry.changes.length === 0) {
            console.log("No changes found in entry");
            return res.sendStatus(400);
        }

        const change = entry.changes[0].value;
        if (!change.messages || !Array.isArray(change.messages) || change.messages.length === 0) {
            console.log("No messages found in changes");
            return res.sendStatus(400);
        }

        const message = change.messages[0];
        const from = message.from;
        const messageBody = message.text && message.text.body;
        
        console.log(`Received message from ${from}: ${messageBody}`);

        if (estadoQuiz == 1) {
            handleQuizResponse(targetNumber, messageBody);
        } else if (estadoCreacionCuenta == 1) {
            console.log("Estado de creación de cuenta activo");
            manejarFotos(req, targetNumber);
        } else {
            iniciarChatbot(req);
        }

        res.sendStatus(200);
    } catch (error) {
        console.error("Error handling the webhook event:", error);
        res.sendStatus(500);
    }
});

async function sendButtonsMessage(to, header, question, buttons) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v16.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
                type: "interactive",
                interactive: {
                    type: "button",
                    header: {
                        type: "text",
                        text: header,
                    },
                    body: {
                        text: question,
                    },
                    footer: {
                        text: "Por favor selecciona una opción:",
                    },
                    action: {
                        buttons: buttons.map((buttonText, index) => ({
                            type: "reply",
                            reply: {
                                id: `button_${index}`,
                                title: buttonText,
                            },
                        })),
                    },
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error(
            "Error sending message:",
            error.response ? error.response.data : error.message
        );
    }
}

async function sendMessage(to, message) {
    try {
        const response = await axios.post(
            `https://graph.facebook.com/v16.0/${phoneNumberId}/messages`,
            {
                messaging_product: "whatsapp",
                to: to,
                type: "text",
                text: {
                    body: message,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Message sent successfully:", response.data);
    } catch (error) {
        console.error(
            "Error sending message:",
            error.response ? error.response.data : error.message
        );
    }
}

const hd = "👋 ¡Hola, soy Banorte Buddy!";
const question = "Estoy aquí para ayudarte con tus necesidades financieras. Utiliza los botones interactivos para continuar o haz clic en el ícono de llamada para conectar con uno de nuestros asesores. :)";
const buttons = [
    "Chat de dudas 🤖",
    "Crear una cuenta 📝",
    "Tu perfil financiero",
];

let userAnswers = {};

async function sendQuizQuestion(to, questionIndex) {
    if (questionIndex >= quizQuestions.length) {
        await sendMessage(to, "¡Gracias por completar el quiz!");
        estadoQuiz = 2;
        console.log('Respuestas del usuario:', userAnswers[to]);
        return;
    }

    const { question, answers } = quizQuestions[questionIndex];
    await sendButtonsMessage(to, "Quiz financiero", question, answers);
}

async function handleQuizResponse(senderId, response) {
    if (!userAnswers[senderId]) {
        userAnswers[senderId] = [];
    }
    userAnswers[senderId].push(response);

    const currentQuestionIndex = userAnswers[senderId].length;
    await sendQuizQuestion(senderId, currentQuestionIndex);
}

async function iniciarCreacionCuenta(to) {
    await sendMessage(to, "Para crear tu cuenta, necesitaré que envíes las siguientes fotos: \n1. Tu INE (ambos lados) 🪪 o pasaporte \n2. Una foto de tu cara. 😎🤳");
    estadoCreacionCuenta = 1;
}

async function manejarFotos(req, senderId) {
    const { messages } = req.body.entry[0].changes[0].value;

    // Verifica si hay mensajes y si el primer mensaje es una imagen
    if (!messages || !messages.length || messages[0].type !== 'image') {
        console.log("No se recibió una imagen");
        return;
    }

    // Obtén los datos de la imagen
    const image = messages[0].image;

    // Aquí podrías obtener más detalles o procesar la imagen según el caso
    console.log(`Imagen recibida - ID: ${image.id}, Mime Type: ${image.mime_type}`);

    // Si necesitas descargar la imagen, usa el ID de la imagen para hacer una solicitud adicional
    try {
        const response = await axios.get(`https://graph.facebook.com/v16.0/${image.id}?fields=picture&access_token=${accessToken}`, { responseType: 'arraybuffer' });
        const imageBuffer = Buffer.from(response.data);

        // Procesa el archivo según sea necesario
        console.log(`Imagen descargada: ${imageBuffer.length} bytes`);
        // Puedes almacenar la imagen en un array o procesarla directamente
        // Si es necesario, actualiza el estado o ejecuta otra lógica
    } catch (error) {
        console.error("Error al descargar la imagen:", error);
    }
}



async function iniciarChatbot(req) {
    const payload = req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
    switch (payload) {
        case "Chat de dudas 🤖":
            console.log("Iniciando chat de dudas...");
            break;
        case "Crear una cuenta 📝":
            console.log("Iniciando proceso de creación de cuenta...");
            estadoCreacionCuenta = 1;
            await iniciarCreacionCuenta(targetNumber);
            break;
        case "Tu perfil financiero":
            console.log('Iniciando quiz interactivo...');
            estadoQuiz = 1;
            await sendQuizQuestion(targetNumber, 0); 
            break;
        default:
            console.log("Opción no reconocida");
            break;
    }
}

sendButtonsMessage(targetNumber, hd, question, buttons)
    .then(() => console.log("Mensaje enviado correctamente"))
    .catch((err) => console.error("Error al enviar el mensaje:", err));

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
