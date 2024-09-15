const express = require("express");
const axios = require("axios");
const app = express();

const { generateGuidance, generateProposal } = require("./text_generation.js");
const prompt = "Como puedo invertir mi dinero?";
/*
const phoneNumberId = "391623854042683"; // Reemplaza con tu ID de número de teléfono
const accessToken =
	"EAAHRUwjl9O4BOZCcWxvWSyCq5OvMga9GeUiIh2SN4gu93Ju37FudXH9UH5IJRrO8rUrV6MJ5dsZBjBiH7XpkSwtL4UcugJkt4YE3b63ZBZBuWDjNeQILKszWDyXD0Py27DWCDM5JKpW3cNkFx3ZBUcRlfjjCLtfJtFga0WKpLytUf5ZAG3nHT731TuGLY9cSrwmn9Yt1ZA4mcletqwZB4oBHxSxRIl17"; // Reemplaza con tu token de acceso
const verificationToken = "mi-token-de-verificacion-secreto"; // Esto debe coincidir con el token que ingresaste en Meta
const targetNumber = "528332666331";
var estadoQuiz = 0;
var estadoQnAprimermensaje = false;
// Estado de la verificación Veriff
let estadoVeriff = false;
var correo = false;
var counter = 0;

// Tu clave de API y URL de Veriff
const apiKey = "341af7eb-f5c0-4893-b2b9-b38e24b63d28";
const apiSecret = "7228ea63-651c-4a45-b0e2-89db7b8aa429";
const veriffUrl = "https://stationapi.veriff.com/v1/sessions";
*/
const phoneNumberId = process.env.phoneNumberId; // Reemplaza con tu ID de número de teléfono
const accessToken = process.env.accessToken; // Reemplaza con tu token de acceso
const verificationToken = process.env.verificationToken; // Esto debe coincidir con el token que ingresaste en Meta
const targetNumber = "528332666331";
var estadoQuiz = 0;
var estadoQnAprimermensaje = false;
// Estado de la verificación Veriff
let estadoVeriff = false;
var correo = false;
var counter = 0;

// Tu clave de API y URL de Veriff
const apiKey = process.env.apiKey;
const apiSecret = process.env.apiSecret;
const veriffUrl = process.env.veriffUrl;


async function startVeriffVerification(userId, callbackUrl) {
	try {
		const response = await axios.post(
			`${veriffUrl}`,
			{
				verification: {
					callback: callbackUrl,
				},
			},
			{
				headers: {
					"Content-Type": "application/json",
					"X-AUTH-CLIENT": apiKey, // Usa X-AUTH-CLIENT para la autenticación
				},
			}
		);
		console.log(response);
		// Extrae la URL de verificación y el ID de la sesión de la respuesta
		const verificationUrl = response.data.verification.url;
		const sessionId = response.data.verification.id;
		console.log(verificationUrl);
		return JSON.stringify(verificationUrl);
	} catch (error) {
		console.error("Error initiating Veriff verification:", error);
		throw error;
	}
}

app.post("/veriff/callback", async (req, res) => {

		//const verificationStatus = req.verification.status; // Ajusta según la estructura de los datos de Veriff
		//console.log(verificationStatus);


	if (true) {
		// Verificación exitosa
		console.log(
			`Verificación exitosa`
		);

		// Enviar mensaje a WhatsApp confirmando la verificación
		await sendMessage(
			targetNumber,
			"✅ ¡Genial! Tu verificación ha sido completada con éxito."
		);

		// Opcional: Redirigir al usuario a una página o proporcionar un enlace
		await sendMessage(targetNumber, "¡Solo un paso más para que obtengas todos los beneficios que Banorte tiene para ti!");
        correo = true;
	} else {
		// Verificación fallida
		console.log(
			`Verificación fallida para el usuario ${verificationStatus.externalId}`
		);
		// Notificar al usuario de la falla
		await sendMessage(
			targetNumber,
			"La verificación de identidad no fue exitosa. Por favor, intenta nuevamente."
		);
	}

	res.sendStatus(200); // Responder a Veriff que hemos recibido el callback
});

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
// Webhook para manejar los mensajes entrantes
app.post("/webhook", async (req, res) => {
	try {
		const entry = req.body.entry?.[0];
		const change = entry?.changes?.[0]?.value;
		const message = change?.messages?.[0];
		const from = message?.from;
		const messageBody = message?.text?.body; // Si es un mensaje de texto
		const buttonResponse = message?.interactive?.button_reply?.title; // Si es un botón
        console.log(correo);

		if (estadoQnA) {
			if (!estadoQnAprimermensaje) {
				// Si no es el primer mensaje, inicia el Q&A
				await startQnA(targetNumber, req);
			} else {
				// Verificar si fue una respuesta de botón o texto
				if (buttonResponse) {
					// Respuesta mediante un botón
					await handleQnAResponse(targetNumber, buttonResponse);
				} else if (messageBody) {
					// Respuesta mediante texto
					await handleQnAResponse(targetNumber, messageBody);
				}
			}
		} else if (estadoQuiz === 1) {
			// Si estamos en el quiz, manejamos la respuesta del quiz
			if (buttonResponse) {
				await handleQuizResponse(targetNumber, buttonResponse);
			} else if (estadoVeriff && messageBody) {
				// Confirmar que Veriff se completó
				console.log("Verificación con Veriff completada.");
				await sendMessage(
					targetNumber,
					"La verificación de identidad ha sido completada con éxito. Ahora, por favor, envíanos tu correo electrónico para la verificación 2FA."
				);
				estadoVeriff = false; // Restablecer estado
			}
		} else if (correo == true && counter == 0) {
            counter = 1;
            await sendMessage(
                targetNumber,
                "🔑 Aquí están tus credenciales temporales para iniciar sesión en la aplicación de Banorte. Por razones de seguridad, necesitarás cambiar esta contraseña temporal después de iniciar sesión."
            );
            const user = generarCodigo2FA();
            const pass = generarCodigo2FA();
            await sendMessage(
                targetNumber,
            `*ID de usuario:* ${user}\n*Contraseña temporal:* ${pass}\n\n`
            );
            const botonesFin = [
                "Chat de dudas 🤖",
                "Tu perfil financiero",
            ];
            await sendButtonsMessage(targetNumber, "🎓 ¡Sigue aprendiendo con Banorte!", "Estoy aquí para ayudarte con tus necesidades financieras. Utiliza los botones interactivos para continuar o haz clic en el ícono de llamada para conectar con uno de nuestros asesores. :)", botonesFin);


        }
        else {
			// Si no es el quiz ni Q&A, inicia el chatbot
			await iniciarChatbot(req);
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
let estadoQnA = false; // Almacena el estado de Q&A por usuario

// Función para enviar la pregunta del quiz con botones
async function sendQuizQuestion(to, questionIndex) {
	if (questionIndex >= quizQuestions.length) {
		// Quiz terminado
		await sendMessage(to, "¡Gracias por completar el quiz!");
		estadoQuiz = 2;
		const proposal = await generateProposal(JSON.stringify(userAnswers));
		await sendMessage(targetNumber, proposal);
		console.log("Respuestas del usuario:", userAnswers[to]); // Mostrar respuestas
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
		question: "¿Tienes alguna otra duda sobre finanzas?",
		answers: [truncateText("Sí", 20), truncateText("No", 20)],
	},
];

// Función para iniciar el Q&A
async function startQnA(to, req) {
	const userMessage = req.body.entry[0].changes[0].value.messages[0].text?.body; // Extrae el texto del usuario si existe

	const guidance = await generateGuidance(userMessage);

	// Envía la orientación generada al usuario
	await sendMessage(to, guidance);

	estadoQnAprimermensaje = true; // Marcar que ya recibimos el primer mensaje

	// Enviar la primera pregunta del Q&A con botones
	const { question, answers } = qnaQuestions[0];
	await sendButtonsMessage(to, "Chat de dudas 🤖", question, answers);
	estadoQnAprimermensaje = false; // Se resetea para esperar la siguiente interacción
}

// Función para manejar la respuesta del Q&A
async function handleQnAResponse(senderId, response) {
	if (estadoQnA) {
		if (response === "No") {
			// Si el usuario responde "No", termina el Q&A
			await sendMessage(
				senderId,
				"Gracias por participar en el chat de dudas."
			);
			estadoQnA = false; // Marca que ya no está en el Q&A
			estadoQnAprimermensaje = false;
		} else if (response === "Sí") {
			// Si responde "Sí", continúa el Q&A
			await sendMessage(senderId, "Por favor, escribe tu próxima duda.");
		} else {
			// Respuesta no esperada o respuesta por texto
			await sendMessage(senderId, "Por favor selecciona una opción válida.");
			const { question, answers } = qnaQuestions[0];
			await sendButtonsMessage(senderId, "Chat de dudas 🤖", question, answers);
		}
	}
}

function generarCodigo2FA() {
	return Math.floor(1000000 + Math.random() * 9000000); // Genera un número de 6 dígitos
}

async function iniciarChatbot(req) {
	const payload =
		req.body.entry[0].changes[0].value.messages[0].interactive.button_reply
			.title;
	//const userMessage = req.body.entry[0].changes[0].value.messages[0].text.body; // Extrae el texto del usuario
	switch (payload) {
		case "Chat de dudas 🤖":
			// Código para iniciar el chat de dudas
			console.log("Iniciando chat de dudas...");
			estadoQnA = true; // Marca que el usuario está en el Q&A
			await sendMessage(targetNumber, "¿Qué dudas acerca de finanzas tienes?");
			break;

		case "Crear una cuenta 📝":
			// Código para crear una cuenta
			console.log("Iniciando proceso de creación de cuenta...");
			// Lógica para iniciar proceso de crear cuenta
			const veriffUrl = await startVeriffVerification(
				targetNumber,
				"https://de4f-131-178-102-164.ngrok-free.app/veriff/callback"
			);
			await sendMessage(
				targetNumber,
				`Por favor, completa el proceso de verificación a través de este enlace: ${veriffUrl}`
			);
			estadoVeriff = true; // Marcar que el usuario está en el proceso de verificación con Veriff
			break;

		case "Tu perfil financiero":
			console.log("Iniciando quiz interactivo...");
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
