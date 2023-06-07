import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message:
          "OpenAI API key not configured, please follow instructions in README.md",
      },
    });
    return;
  }

  const { colleague, recommendationSpecs } = req.body;
  if (!colleague || !recommendationSpecs) {
    res.status(400).json({
      error: {
        message: "Required field 'colleague' is missing.",
      },
    });
    return;
  }

  try {
    const prompt = generatePrompt(colleague, recommendationSpecs);
    console.log("Prompt: ", prompt);
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0.6,
      max_tokens: 2000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: "An error occurred during your request.",
        },
      });
    }
  }
}

function generatePrompt(colleague, recommendationSpecs) {
  const { name, gender, relationship, title, hardSkills, softSkills } =
    colleague;
  return `Write a LinkedIn Recommendation for my colleague ${name}.
${gender} is a ${title}. ${gender} is ${relationship}.
${name} has following hard skills: ${hardSkills.join(
    ", "
  )} and soft skills: ${softSkills.join(", ")}.
The recommendation should show at most 2 hard skills and 2 soft skills of ${name}.
The recommendation should around ${recommendationSpecs.length} long and in ${
    recommendationSpecs.language
  }.

Store the recommendation in a JSON object containing a field "recommendation", the value of which is a string.
Stringify the JSON object and make it your response. 
Generate the stringified JSON object without unnecessary spaces or line breaks so that it can be easily parsed by JSON.parse() method without error.
`;
}
