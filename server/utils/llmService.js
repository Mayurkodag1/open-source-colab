import { GoogleGenerativeAI } from '@google/generative-ai';
const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

if (!API_KEY) {
    console.error("GOOGLE_API_KEY is not set in .env file.");
    // In a production environment, you might want to throw an error or handle this more gracefully.
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const getMentorResponse = async (userQuery, chatHistory, projectDetails, githubContext) => {
    if (!API_KEY) {
        return "Mentor service is not configured. Please set GOOGLE_API_KEY.";
    }

    let prompt = `You are an AI mentor for an open-source project. Provide helpful and concise guidance based on the context provided. Do Not use markdown syntax in your messages, since the UI cannot render it. Make sure to be concise and to the point. Use short messages if possible, unless it is necessary to provide more information. Remember, you will be using a chat interface.
    
User Query: ${userQuery}

Project Details:
Title: ${projectDetails.title}
Description: ${projectDetails.description}
${projectDetails.issues ? 'Issues:\n' + projectDetails.issues.map(issue => `- ${issue.title}: ${issue.description}`).join('\n') : ''}

GitHub Context (from README.md):
${githubContext}

Chat History:
${chatHistory.map(msg => `${msg.sender.username || 'User'}: ${msg.content}`).join('\n')}

Based on the above, provide a concise and helpful mentor response.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        return text;
    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "I'm sorry, I couldn't generate a response at this moment. Please try again later.";
    }
};

export { getMentorResponse };
