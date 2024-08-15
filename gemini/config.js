const { GoogleGenerativeAI } = require("@google/generative-ai");

class GeminiAI {
    constructor(apiKey) {
        this.genAI = new GoogleGenerativeAI(apiKey);
    }

    async run(interviewScriptData) {
        const model = this.genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = interviewScriptData;

        const result = await model.generateContent(prompt);
        const response = result.response;
        const text = response.text();
        return text;
    }
}

const apiKey = 'AIzaSyB5qPCCPUAv6zBXhN4_o8KnDFp-1axUf3E';
const geminiAI = new GeminiAI(apiKey);
export default geminiAI;