const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold, ModelContent } = require("@google/generative-ai");
env = require('dotenv').config();
const readline = require('readline');
const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
        category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
        threshold: HarmBlockThreshold.BLOCK_NONE,
    }
  ];

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash", safetySettings: safetySettings });
let chat = model.startChat();

function askQuestion(query) {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }))
}

async function generateText(response) {
    var result;
    result = await chat.sendMessage(response);
    // Remove line break characters
    var text = result.response.text().replace(/(\r\n|\n|\r)/gm, "");
    return text;
}

async function main() {
    await chat.sendMessage("You are a simulated chat AI used to help me practice setting boundaries. Give a single line response given this information, formatted as a casual text from a friend. You should be forceful and push back on what I'm saying a lot, just for practice. Text very casually (lowercase, abbreviations when makes sense to do so).");
    var yourResponse = "Hello!";
    var previousAiResponse = "Starting simulation..."
    // var previousAiResponse = await generateText(yourResponse, previousAiResponse);
    // Begin loop with prompt for user input
    while (true) {
        console.log("AI Response: " + previousAiResponse);
        // Prompt and wait for input
        yourResponse = await askQuestion("Your response: ");
        previousAiResponse = await generateText(yourResponse, previousAiResponse);
    }
}   

main();