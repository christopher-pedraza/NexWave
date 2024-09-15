const express = require('express');
const axios = require('axios');
const app = express();

const phoneNumberId = '391623854042683'; // Reemplaza con tu ID de número de teléfono
const accessToken = 'EAAHRUwjl9O4BOzW7OWfwvwJZB0YmUGRsZB6hUFFOpBxvJFi0l1NZBY5WiwlMn1JKV2eZA2I7qF1AHr8lhjabMqrnfXIgIZC5q2bZB3ISzCEBqGvLf9CUG7NQtDbc1a57CNLLQXkTUciB1ZCu9SGitdwjuPUz780Myn9FImxX1wqrnnZAZB6YQ6tOdw94j3vkRcLIaw2ytVamX1mE3DXxHTq2ZBfgPXAZA0ZD'; // Reemplaza con tu token de acceso
const verificationToken = 'mi-token-de-verificacion-secreto'; // Esto debe coincidir con el token que ingresaste en Meta
const targetNumber = '528332666331';
let userState = {}; // Guarda el estado del usuario


// Ruta para el Webhook de verificación
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    // Verifica si el token de verificación coincide
    if (mode && token === verificationToken) {
        console.log('Webhook verificado correctamente');
        res.status(200).send(challenge);  // Responde con el challenge para confirmar la verificación
    } else {
        res.sendStatus(403);  // Rechaza la verificación si el token no coincide
    }
});


app.use(express.json());


// Preguntas del quiz
const quizQuestions = [
    {
        question: "Si tuvieras la oportunidad de conseguir un lugar para vivir, ¿preferirías comprar una casa o rentar un departamento?",
        answers: [
            "Comprar una casa",
            "Rentar un departamento",
            "No estoy seguro"
        ]
    },
    {
        question: "¿Qué harías si recibieras una cantidad inesperada de dinero, como un bono o un regalo?",
        answers: [
            "Ahorrarlo",
            "Invertirlo",
            "Gastarlo"
        ]
    },
    {
        question: "Cuando piensas en tus finanzas para los próximos 5 años, ¿cuáles son tus principales metas?",
        answers: [
            "Metas a corto plazo (comprar un auto, viajar)",
            "Metas a largo plazo (ahorrar para una casa, inversión)",
            "No tengo metas financieras claras"
        ]
    },
    {
        question: "Si tus amigos te invitan a una actividad costosa que no tenías planeada, ¿cómo reaccionarías?",
        answers: [
            "Seguiría mi presupuesto estricto",
            "Priorizaría la experiencia inmediata",
            "Buscaría una solución flexible"
        ]
    },
    {
        question: "¿Qué importancia le das a aprender sobre inversiones o productos financieros, y has considerado invertir en algo antes?",
        answers: [
            "Es muy importante y ya he considerado invertir",
            "Es importante pero nunca he invertido",
            "No es importante para mí"
        ]
    }
];


app.use(express.json());
// Ruta para manejar mensajes y respuestas
app.post('/webhook', (req, res) => {
    if (!req.body || !req.body.entry || !Array.isArray(req.body.entry) || req.body.entry.length === 0) {
        console.log('Formato de solicitud inválido');
        return res.sendStatus(400); // Bad Request
    }

    const entry = req.body.entry[0];
    if (!entry.messaging || !Array.isArray(entry.messaging) || entry.messaging.length === 0) {
        console.log('No se encontraron eventos de mensajería en la entrada');
        return res.sendStatus(400); // Bad Request
    }

    const messagingEvent = entry.messaging[0];
    const senderId = messagingEvent.sender && messagingEvent.sender.id;
    const messageText = messagingEvent.message && messagingEvent.message.text;
    const postbackPayload = messagingEvent.postback && messagingEvent.postback.payload;

    handleQuizResponse(senderId, messageText);

    if (messageText) {
        console.log(`Received button response from ${senderId}: ${messageText}`);
        handleQuizResponse(senderId, messageText);
    } else {
        console.log('Evento de mensajería desconocido');
    }

    res.sendStatus(200); // OK
});

async function sendButtonsMessage(to, question, buttons) {
    try {
        const response = await axios.post(`https://graph.facebook.com/v16.0/${phoneNumberId}/messages`, {
            messaging_product: "whatsapp",
            to: to,
            type: "interactive",
            interactive: {
                type: "button",
                header: {
                    type: "text",
                    text: "Quiz Time!"
                },
                body: {
                    text: question
                },
                footer: {
                    text: "Please select an option:"
                },
                action: {
                    buttons: buttons.map((buttonText, index) => ({
                        type: "reply",
                        reply: {
                            id: `button_${index}`,
                            title: buttonText
                        }
                    }))
                }
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
}

async function sendMessage(to, message) {
    try {
        const response = await axios.post(`https://graph.facebook.com/v16.0/${phoneNumberId}/messages`, {
            messaging_product: "whatsapp",
            to: to,
            type: "text",
            text: {
                body: message
            }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('Message sent successfully:', response.data);
    } catch (error) {
        console.error('Error sending message:', error.response ? error.response.data : error.message);
    }
}

async function sendQuizStartMessage() {
    const question = "¿Quieres iniciar el quiz?";
    const buttons = [
        "Sí",
        "No"
    ];

    await sendButtonsMessage(targetNumber, question, buttons);
}

async function sendQuizQuestion(to, questionIndex) {
    if (questionIndex >= quizQuestions.length) {
        // Quiz terminado
        sendMessage(to, "¡Gracias por completar el quiz!");
        return;
    }

    const { question, answers } = quizQuestions[questionIndex];
    await sendButtonsMessage(to, question, answers);
}

function handleQuizResponse(to, response) {
    console.log(response);
    if (response === 'button_0') { // Si el usuario seleccionó "Sí"
        if (!userState[to]) {
            userState[to] = { step: 0 }; // Inicializa el estado del usuario
        }

        const user = userState[to];
        sendQuizQuestion(to, user.step);
    } else if (response === 'button_1') { // Si el usuario seleccionó "No"
        sendMessage(to, "Entendido, no iniciaré el quiz.");
        // Opcional: Podrías también limpiar el estado del usuario si es necesario
    } else {
        // Maneja otras respuestas si es necesario
        console.log('Respuesta del botón desconocida');
    }
}

// Enviar el mensaje inicial al número específico
sendQuizStartMessage();

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
