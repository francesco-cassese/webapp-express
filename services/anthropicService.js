import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage, SystemMessage } from 'langchain';

const model = new ChatAnthropic({
    model: "claude-haiku-4-5",
    apiKey: process.env.CLAUDE_API_KEY,
});

const messaggiaClaude = (messaggio, systemPrompt) => {
    return model.invoke([
        new SystemMessage(systemPrompt),
        new HumanMessage(messaggio)
    ])
}

export { messaggiaClaude }