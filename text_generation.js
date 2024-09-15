const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const initialPrompt = "Eres un asistente de inteligencia artificial para el banco de Banorte. Tu trabajo es resolver dudas con respecto a la educación financiera para un joven, de preferencia dentro del contexto de las politicas del banco de Banorte.";

async function contextPrompt() {
    const result = await model.generateContent(initialPrompt);
    //console.log(result.response.text());
}

contextPrompt();

module.exports = {
    generateStory: async function(_prompt) {
        const result = await model.generateContent(_prompt);
        console.log(result.response.text());
    }
};

