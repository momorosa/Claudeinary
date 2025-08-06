import OpenAI from "openai";

export default async function handler(req, res) {
  
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const { prompt } = req.body ?? {}
    if (!prompt) {
        return res.status(400).json({ message: "Prompt missing" })
    }

    /* ── Call OpenAI Images (DALL·E 3) ────────────────────────────── */
    try {
        const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

        const { data } = await openai.images.generate({
            model: "dall-e-3",     
            prompt,
            size: "1024x1024",
            quality: "standard",  
        })

        const imageUrl = data?.[0]?.url
        if (!imageUrl) {
            console.error("OpenAI returned no URL", data)
            return res.status(502).json({ message: "No image URL returned" })
        }

        return res.status(200).json({ url: imageUrl })
    } catch (err) {
        console.error("Image API error:", err)
        return res
        .status(err.status ?? 500)
        .json({ message: err.error?.message ?? "Failed to generate image" })
    }

    /* ── Call OpenAI Images (gpt-image-1) ────────────────────────────── */

    // try {
    //     const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

    //     const { data } = await openai.images.generate({
    //         model: "gpt-image-1",     
    //         prompt,
    //         size: "1024x1024",
    //         quality: "medium",  
    //     })

    //     const b64 = data[0].b64_json

    //     const imageUrl = `data:image/png;base64,${b64}`

    //     if (!imageUrl) {
    //         console.error("OpenAI returned no URL", data)
    //         return res.status(502).json({ message: "No image URL returned" })
    //     }

    //     return res.status(200).json({ url: imageUrl })
    // } catch (err) {
    //     console.error("Image API error:", err)
    //     return res
    //     .status(err.status ?? 500)
    //     .json({ message: err.error?.message ?? "Failed to generate image" })
    // }
}
