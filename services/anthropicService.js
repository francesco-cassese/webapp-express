import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage } from 'langchain';

const model = new ChatAnthropic({
    model: "claude-haiku-4-5",
    apiKey: process.env.CLAUDE_API_KEY,
});

const messaggiaClaude = messaggio => {
    return model.invoke([
        new HumanMessage(messaggio)
    ])
}

export { messaggiaClaude }