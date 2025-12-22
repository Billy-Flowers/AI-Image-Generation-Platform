import * as dotenv from "dotenv";
import { createError } from "../errors/error.js";
import { InferenceClient } from "@huggingface/inference";

dotenv.config();

const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);

export const generateImage = async (req, res, next) => {
  try {
    const { prompt } = req.body;
    
    console.log("Attempting to generate image with prompt:", prompt);
    
    const image = await client.textToImage({
      provider: "nscale",
      model: "stabilityai/stable-diffusion-xl-base-1.0",
      inputs: prompt,
      parameters: { num_inference_steps: 20,
                    guidance_scale: 7.5
       },
    });
    
    const arrayBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(arrayBuffer).toString('base64');
    
    console.log("Image generated successfully");
    res.status(200).json({ photo: base64Image });
  } catch (error) {
    console.error("Error generating image:", error.message);
    next(createError(error.status || 500, error.message || "Failed to generate image"));
  }
};
