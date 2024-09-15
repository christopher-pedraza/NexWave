const express = require("express");
const axios = require("axios");
const app = express();

const phoneNumberId = "391623854042683"; // Reemplaza con tu ID de número de teléfono
const accessToken =
	"EAAHRUwjl9O4BO92yZA12ol9wzRzTtrTluxittTITEnKrvgFF9Tw3XcopnNk8745Jnx127Nlr3etvXOLCHzETLxDmXF5PRNGQOiFX9rZAtRUDw7wZAo4r7n2DB3ScoSV2KVcmhBmqKe1A3kphojumuy2fxzpTBx59O3UqeaeGqZBRz1eoVERnkS2f6YYbfag859gb9NXixEKZAplu3Rczk9QRWQUoZD"; // Reemplaza con tu token de acceso
const verificationToken = "mi-token-de-verificacion-secreto"; // Esto debe coincidir con el token que ingresaste en Meta
const targetNumber = "528332666331";

var estadoQuiz = 0;
var estadoCreacionCuenta = 0;

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

     


            
        if (estadoQuiz == 1) {
            // Si hay una respuesta a un botón, manejar el quiz
            handleQuizResponse(targetNumber, req.body.entry[0].changes[0].value.messages[0].interactive.button_reply
                .title);
        } if (estadoCreacionCuenta == 1) {
            console.log("hola");
            manejarFotos(req, targetNumber)
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

// Función para enviar la pregunta del quiz con botones
async function sendQuizQuestion(to, questionIndex) {
    if (questionIndex >= quizQuestions.length) {
        // Quiz terminado
        await sendMessage(to, "¡Gracias por completar el quiz!");
        estadoQuiz = 2;
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

async function iniciarCreacionCuenta(to) {
    await sendMessage(to, "Para crear tu cuenta, necesitaré que envíes las siguientes fotos: \n1. Tu INE (ambos lados) 🪪\n2. Una foto de tu cara. 😎🤳");
    estadoCreacionCuenta = 1;
}

async function manejarFotos(req, senderId) {
    const files = req.files || [];
    console.log("llegue aqui");
    const documentArray = [];

    // Almacena cada archivo recibido en el array
    for (const file of files) {
        documentArray.push(file.buffer); // Agrega el contenido del archivo al array
        console.log(file);
    }

    if (documentArray.length === 3) {
        // Si se han recibido 3 archivos, procesa la información
        await sendMessage(senderId, "Recibí tus documentos. Estoy procesando la información, por favor, espera un momento.");
        //await procesarDocumentos(senderId, documentArray); // Función para manejar la API de autenticación
    }
}




async function iniciarChatbot(req) {
    const payload =
	req.body.entry[0].changes[0].value.messages[0].interactive.button_reply.title;
	switch (payload) {
		case "Chat de dudas 🤖":
			// Código para iniciar el chat de dudas
			console.log("Iniciando chat de dudas...");
			// Aquí puedes incluir lógica adicional o llamar a otra función
			break;

		case "Crear una cuenta 📝":
			// Código para crear una cuenta
			console.log("Iniciando proceso de creación de cuenta...");
			// Lógica para iniciar proceso de crear cuenta
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

// Llama a la función para enviar el mensaje inicial
sendButtonsMessage(targetNumber, hd, question, buttons)
	.then(() => console.log("Mensaje enviado correctamente"))
	.catch((err) => console.error("Error al enviar el mensaje:", err));

// Iniciar el servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
	console.log(`Servidor escuchando en el puerto ${PORT}`);
});
