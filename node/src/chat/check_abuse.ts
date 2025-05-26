import { chatGenerate } from "./api";

const PROMPT = `Determine whether the following sentence contains profanity.
If it contains profanity, respond with "profanity_detected".
If it does not, respond with "no_profanity".
Respond with only one of the two options.

Sentence: `;

export async function checkAbuse(text: string): Promise<boolean> {
    const result = await chatGenerate(`${PROMPT} "${text}"`);
    const r = result?.response;
    if (!r) throw new Error(`resposne error : ${r}`);
    const found = `${r}`.toLowerCase().replace(/[^a-z_]/g, '');
    if (found.includes('detect')) return true;
    return false;
}