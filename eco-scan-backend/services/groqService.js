const Groq = require("groq-sdk");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require('path')

dotenv.config();

// Initialize Groq with the API key
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function analyzeImage(imagePath) {
  try {
    // Check if the image file exists
    if (!fs.existsSync(imagePath)) {
      throw new Error(`Image file does not exist at path: ${imagePath}`);
    }

    // Generate the public URL for the image
    const filename = path.basename(imagePath);
    const publicURL = `${process.env.SERVER_BASE_URL}/uploads/${filename}`;
    console.log("Public Image URL:", publicURL);

    // Call Groq's chat completion API with the public image URL
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "For the cloth image, assume some carbon content. For example, for cotton you save 1.5 kg of carbon, and just like it for more types of clothes.based on the carbon content of the cloth, calculate the carbon footprint of the cloth.also based on these carbon footprints, calculate the reward points for the user and u have to only return the carbon saved and reward points.",
            },
            {
              type: "image_url",
              image_url: {
                url: publicURL, // Use the public URL
              },
            },
          ],
        },
      ],
      model: "llama-3.2-11b-vision-preview",
      temperature: 1,
      max_tokens: 1024,
      top_p: 1,
      stream: false,
      stop: null,
    });

    // Extract and return the response from the model
    const responseContent = chatCompletion.choices[0]?.message?.content;
    console.log("Groq API Response:", responseContent);

    if (responseContent) {
      return responseContent;
    }

    throw new Error("Invalid response from Groq Vision model");
  } catch (error) {
    console.error("Error analyzing image with Groq API:", error.message);
    console.error("Error Stack:", error.stack);

    throw new Error("Image analysis failed. Check logs for details.");
  }
}

module.exports = { analyzeImage };
