import axios from 'axios';

const SERVER_URL = "http://ollama:11434/";
const MODEL = process.env.OLLAMA_MODEL || "llama3.2:3b";

export interface OllamaGenerateResult {
    model: string;
    created_at: string;
    response: string;
    done: boolean;
    context?: number[];
    total_duration?: number;
    load_duration?: number;
    prompt_eval_count?: number;
    prompt_eval_duration?: number;
    eval_count?: number;
    eval_duration?: number;
}

export async function chatGenerate(prompt: string): Promise<OllamaGenerateResult | null> {
    try {
        const res = await axios.post(`${SERVER_URL}api/generate`, {
            model: MODEL,
            prompt: prompt,
            stream: false
        });

        return res.data as OllamaGenerateResult;
    } catch(e) {
    //    console.log(e);
    }
    return null;
}