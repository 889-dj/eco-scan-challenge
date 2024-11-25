const Groq = require("groq-sdk");
const dotenv = require("dotenv");

dotenv.config();

// Initialize Groq with the API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeImage(cloudinaryURL) {
  try {
    console.log("Cloudinary Image URL:", cloudinaryURL);

    // Call Groq's chat completion API with the Cloudinary image URL
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "For the cloth image, analyze its cloth type and assume some carbon content. For example, for cotton you save 1.5 kg of carbon, and just like it for more types of clothes. Based on the carbon content of the cloth, calculate the carbon footprint of the cloth. Also, based on these carbon footprints, calculate the reward points for the user. Return only the carbon saved and reward points as json only and nothing else as response no text nothing only json `{key:value}`",
            },
            {
              type: "image_url",
              image_url: {
                url: cloudinaryURL,
              },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 0.8,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      response_format: {
        type: "json_object",
      },
      stop: null,
    });

    // Extract and return response
    const responseContent = chatCompletion.choices[0]?.message?.content;
    console.log("Groq API Response:", responseContent);

    if (responseContent) {
      return responseContent;
    }

    throw new Error("Invalid response from Groq Vision model");
  } catch (error) {
    console.error("Error analyzing image with Groq API:", error.message);
    throw new Error("Image analysis failed. Check logs for details.");
  }
}

module.exports = { analyzeImage };
