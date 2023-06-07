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

  const job = req.body.job || "";
  if (job.trim().length === 0) {
    res.status(400).json({
      error: {
        message: "Please enter a valid job title",
      },
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(job),
      temperature: 0.6,
      max_tokens: 1000,
    });
    res.status(200).json({ result: completion.data.choices[0].text });
  } catch (error) {
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: `An error occurred when promting ChatGPT API for hard skills of ${job}.`,
        },
      });
    }
  }
}

function generatePrompt(job) {
  return `List twenty hard skills for a ${job}. 
  Store the skills in a JSON object containing a field "hardSkills", the value of which is a list of strings.
  Stringify the JSON object and make it your response. Generate the stringified JSON object so that it can be easily parsed by JSON.parse() method without error.`;
}
