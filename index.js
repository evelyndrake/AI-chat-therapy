const { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } = require("@google/generative-ai");
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

async function generateText(response, ai_response) {
    const ai_prompt = "You are a simulated chat AI used to help me practice setting boundaries. Your previous response was"  + ai_response + " and my previous response to this was " + response + ". Give a single line response given this information, formatted as a casual text from a friend. You should be forceful and push back on what I'm saying a lot, just for practice. Text very casually (lowercase, abbreviations when makes sense to do so) like you're 17-21. Don't lay that on too thick though.";
    var result;
    result = await model.generateContent(ai_prompt);
    return result.response.text();
}

async function main() {
    var yourResponse = "Hello!";
    
    // Disable prompt autocomplete
    var previousAiResponse = await generateText(yourResponse, previousAiResponse);
    // Begin loop with prompt for user input
    while (true) {
        console.log("AI Response: " + previousAiResponse);
        // Prompt and wait for input
        yourResponse = await askQuestion("Your response: ");

        previousAiResponse = await generateText(yourResponse, previousAiResponse);
    }
}   

main();