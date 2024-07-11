import OpenAI from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
})

export const fetchOpenAIResponse = async (query) => {
  try {
    const messages = [{
        role: "user",
        content: query
      }];
    const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: messages,
        max_tokens: 150
    });

    console.log("OpenAI API full response:", response);

    if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content.trim();
    } else {
        throw new Error("No choices returned in the response");
    }
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    throw error;
  }
};
