const express = require("express");
const axios = require("axios");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const { generateGuidance, generateProposal } = require("./text_generation.js");

const phoneNumberId = "391623854042683"; // Reemplaza con tu ID de número de teléfono
const accessToken =
	"EAAHRUwjl9O4BOyY7fukZAudMLgHlxNIi6jicr4C9zjxhfb41roJClNLLMlBU4Frhy57eEqy70iZA8Tybofgmf1hfqxHyHpSQr544zNse31dJ7PZBA3uFFfK5MXMuMX7XZCnlBgJs6xT4Lu3C39jitNNteK0LqafDTWipGZAOgw4eIEnECFarVs1VzuJRTLp6tzyWH2eGkhEc95yBqlskUqw7SnQMZD"; // Reemplaza con tu token de acceso
const verificationToken = "mi-token-de-verificacion-secreto"; // Esto debe coincidir con el token que ingresaste en Meta
const targetNumber = "528332666331";
var estadoQuiz = 0;

// Ruta para el Webhook de verificación
app.get("/webhook", (req, res) => {
	const mode = req.query["hub.mode"];
	const token = req.query["hub.verify_token"];
	const challenge = req.query["hub.challenge"];

	// Verifica si el token de verificación coincide
	if (mode && token === verificationToken) {
		console.log("Webhook verificado correctamente");
		res.status(200).send(challenge); // Responde con el challenge para confirmar la verificación
	} else {
		res.sendStatus(403); // Rechaza la verificación si el token no coincide
	}
});

app.use(express.json());
// Función para truncar texto a 20 caracteres
function truncateText(text, maxLength) {
	return text.length > maxLength ? text.substring(0, maxLength) : text;
}

// Preguntas del quiz con respuestas ajustadas a 20 caracteres
const quizQuestions = [
	{
		question:
			"Si tuvieras la oportunidad de conseguir un lugar para vivir, ¿preferirías comprar una casa o rentar un departamento?",
		answers: [
			truncateText("Comprar una casa", 20),
			truncateText("Rentar departamento", 20),
			truncateText("No estoy seguro", 20),
		],
	},
	{
		question:
			"¿Qué harías si recibieras una cantidad inesperada de dinero, como un bono o un regalo?",
		answers: [
			truncateText("Ahorrarlo", 20),
			truncateText("Invertirlo", 20),
			truncateText("Gastarlo", 20),
		],
	},
	{
		question:
			"Cuando piensas en tus finanzas para los próximos 5 años, ¿cuáles son tus principales metas?",
		answers: [
			truncateText("Metas a corto plazo", 20),
			truncateText("Metas a largo plazo", 20),
			truncateText("No lo he pensado", 20),
		],
	},
	{
		question:
			"Si tus amigos te invitan a una actividad costosa que no tenías planeada, ¿qué priorizarías?",
		answers: [
			truncateText("Mi presupuesto", 20),
			truncateText("La experiencia", 20),
			truncateText("El punto medio", 20),
		],
	},
	{
		question:
			"¿Qué tan necesario crees que sea aprender sobre inversiones y productos financieros?",
		answers: [
			truncateText("Es muy necesario", 20),
			truncateText("Es algo necesario", 20),
			truncateText("No es necesario", 20),
		],
	},
];

app.use(express.json());
app.post("/webhook", (req, res) => {
	try {
		console.log(
			req.body.entry[0].changes[0].value.messages[0].interactive.button_reply
				.title
		);

		// Check if req.body.entry exists and is an array with at least one item
		if (
			!req.body ||
			!req.body.entry ||
			!Array.isArray(req.body.entry) ||
			req.body.entry.length === 0
		) {
			console.log("No entry data found");
			return res.sendStatus(400); // Bad Request
		}

		const entry = req.body.entry[0]; // Access the first entry

		// Check if changes array exists and has at least one item
		if (
			!entry.changes ||
			!Array.isArray(entry.changes) ||
			entry.changes.length === 0
		) {
			console.log("No changes found in entry");
			return res.sendStatus(400); // Bad Request
		}

		const change = entry.changes[0].value;

		// Check if messages array exists and has at least one item
		if (
			!change.messages ||
			!Array.isArray(change.messages) ||
			change.messages.length === 0
		) {
			console.log("No messages found in changes");
			return res.sendStatus(400); // Bad Request
		}

		const message = change.messages[0];

		// Now safely access the data
		const from = message.from;
		const messageBody = message.text && message.text.body;
        

		console.log(`Received message from ${from}: ${messageBody}`);

        if (estadoQnA[from]) {
			// Manejar la respuesta del Q&A
			const buttonResponse = message.interactive && message.interactive.button_reply && message.interactive.button_reply.title;
			handleQnAResponse(from, buttonResponse || messageBody);
        }

        if (estadoQuiz == 1) {
            // Si hay una respuesta a un botón, manejar el quiz
            handleQuizResponse(targetNumber, req.body.entry[0].changes[0].value.messages[0].interactive.button_reply
                .title);
        } else {
            iniciarChatbot(req); // Iniciar el chatbot si no es parte del quiz
        }

		res.sendStatus(200); // OK
	} catch (error) {
		console.error("Error handling the webhook event:", error);
		res.sendStatus(500); // Internal Server Error
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
						text: "Porfavor selecciona una opción:",
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



// Enviar el mensaje inicial al número específico
const hd = "👋 ¡Hola, soy Banorte Buddy!";
const question =
	"Estoy aquí para ayudarte con tus necesidades financieras. Utiliza los botones interactivos para continuar o haz clic en el ícono de llamada para conectar con uno de nuestros asesores. :)";
const buttons = [
	"Chat de dudas 🤖",
	"Crear una cuenta 📝",
	"Tu perfil financiero",
];

let userAnswers = {}; // Objeto para almacenar las respuestas de los usuarios
let estadoQnA = {}; // Almacena el estado de Q&A por usuario

// Función para enviar la pregunta del quiz con botones
async function sendQuizQuestion(to, questionIndex) {
    if (questionIndex >= quizQuestions.length) {
        // Quiz terminado
        await sendMessage(to, "¡Gracias por completar el quiz!");
        estadoQuiz = 2;
        generateProposal(userAnswers);
        console.log('Respuestas del usuario:', userAnswers[to]); // Mostrar respuestas
        return;
    }

    const { question, answers } = quizQuestions[questionIndex];
    await sendButtonsMessage(to, "Quiz financiero", question, answers);
}

// Función para manejar la respuesta del quiz
async function handleQuizResponse(senderId, response) {
    // Guardar la respuesta del usuario
    if (!userAnswers[senderId]) {
        userAnswers[senderId] = []; // Inicializar si no existe
    }
    userAnswers[senderId].push(response);

    // Determinar cuál es la siguiente pregunta
    const currentQuestionIndex = userAnswers[senderId].length;
    await sendQuizQuestion(senderId, currentQuestionIndex);
}

// Pregunta para el Q&A
const qnaQuestions = [
	{
		question:
			"¿Tienes alguna otra duda sobre finanzas?",
		answers: [
			truncateText("Sí", 20),
			truncateText("No", 20),
		],
	},
]

// Función para iniciar el Q&A
async function startQnA(to, userMessage) {
    estadoQnA[to] = true; // Marca que el usuario está en el Q&A
    await sendMessage(to, "¿Qué dudas acerca de finanzas tienes?");

    const guidance = await generateGuidance(userMessage);

    // Envía la orientación generada al usuario
    await sendMessage(to, guidance);

    // Manda la primera pregunta del Q&A con botones
    const { question, answers } = qnaQuestions[0];
    await sendButtonsMessage(to, "Chat de dudas 🤖", question, answers);
}

async function handleQnAResponse(senderId, response) {
    if (estadoQnA[senderId]) {
        if (response === "No") {
            // Si el usuario responde "No", termina el Q&A
            await sendMessage(senderId, "Gracias por participar en el chat de dudas.");
            estadoQnA[senderId] = false; // Marca que ya no está en el Q&A
        } else if (response === "Sí") {
            // Si responde "Sí", continúa el Q&A
            await sendMessage(senderId, "Por favor, escribe tu próxima duda.");
        } else {
            // Respuesta no esperada
            await sendMessage(senderId, "Por favor selecciona una opción válida.");
            const { question, answers } = qnaQuestions[0];
            await sendButtonsMessage(senderId, "Chat de dudas 🤖", question, answers);
        }
    }
}


async function iniciarChatbot(req) {
    const payload =
	req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
    const userMessage = req.body.entry[0].changes[0].value.messages[0].text.body; // Extrae el texto del usuario
	switch (payload) {
		case "Chat de dudas 🤖":
			// Código para iniciar el chat de dudas
			console.log("Iniciando chat de dudas...");
            await startQnA(targetNumber, userMessage);
			break;

		case "Crear una cuenta 📝":
			// Código para crear una cuenta
			console.log("Iniciando proceso de creación de cuenta...");
			// Lógica para iniciar proceso de crear cuenta
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

// Llama a la función para enviar el mensaje inicial
sendButtonsMessage(targetNumber, hd, question, buttons)
	.then(() => console.log("Mensaje enviado correctamente"))
	.catch((err) => console.error("Error al enviar el mensaje:", err));

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});