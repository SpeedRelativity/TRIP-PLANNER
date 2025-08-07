"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateItineraryfromPrompt = void 0;
const dotenv = __importStar(require("dotenv"));
const axios_1 = __importDefault(require("axios"));
dotenv.config();
const generateItineraryfromPrompt = async (prompt) => {
    const apiKey = process.env.GROQ_API_KEY;
    // axios.post takes 3 parameters: url, data, configuration
    const response = await axios_1.default.post("https://api.groq.com/openai/v1/chat/completions", {
        model: "llama-3.3-70b-versatile",
        messages: [
            {
                role: "system",
                content: `You are a travel assistant. ONLY respond with a valid JSON array of activities. Do not include any explanation or formatting. Each activity must include:

                {
                "id": "unique string ID",
                "title": "Short title of the activity",
                "location": "City or region",
                "description": "Brief description of what the activity involves"
                }

                Generate 5 diverse activities across multiple popular locations based on the user's input. Ensure JSON array is valid. No markdown, no text outside the array.`
            },
            {
                role: "user",
                content: prompt,
            },
        ],
        temperature: 0.7, // randomness
        max_tokens: 2048, // token limit to save cost
    }, {
        // auth takes Bearer prefix with a token
        headers: {
            "Authorization": `Bearer ${apiKey}`,
            "Content-Type": "application/json",
        },
    });
    return JSON.stringify(response.data.choices[0].message.content);
};
exports.generateItineraryfromPrompt = generateItineraryfromPrompt;
