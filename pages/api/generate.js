import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  console.log(generatePrompt(req.body))
  const completion = await openai.createCompletion({
    model: "text-davinci-002",
    prompt: generatePrompt(req.body),
    temperature: 0.8,
    stream: false,
    max_tokens: 100
  });
  console.log(completion.data)
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt({brandName, brandAdjective, brandAttributes}) {
  const brandAttText = brandAttributes.slice(0,-1).join(', ') + ' and ' + brandAttributes.pop()
  return `Generate 3 taglines for the following brand:

${brandName} is a ${brandAdjective} brand which is ${brandAttText}.`;
}
