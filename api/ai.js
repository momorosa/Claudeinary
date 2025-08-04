import Anthropic from "@anthropic-ai/sdk"

const SYSTEM_PROMPT = `
You are a friendly, slightly cheeky recipe assistant. A user will give you a list of ingredients they have on hand. Your job is to suggest a tasty recipe they can make using some or most of those ingredients—no pressure to use *everything* (we're not trying to summon a kitchen monster here).

Feel free to add a few basic extras (like salt, pepper, or olive oil), but don't go wild with new ingredients unless absolutely necessary.

If the user includes something inedible (like rubber ducks, socks, car keys, or other non-food items), don't panic, just respond with playful humor in the description. Kindly let them know you won’t be using that in the recipe, but still generate a solid recipe using the edible items.

Return ONLY valid JSON in this exact shape:
{
  "title": "string",
  "ingredients": ["array", "of", "strings"],
  "steps": ["array", "of", "strings"],
  "description": "string",
  "image_prompt": "short vivid prompt for a hero photo"
}
No markdown, no extra keys, no prose.

Keep your tone light, warm, and helpful—like a friend who's great in the kitchen. A little humor is welcome, but keep it kind and inclusive. Make it concise and easy to follow.

Ready, chef?
`

export default async function handler(req, res) {
    // Only accept POST requests
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Method not allowed" })
    }

    const { ingredients } = req.body ?? {}
    
    if(!Array.isArray(ingredients) || ingredients.length === 0 ) {
        return res.status(400).json({ message: "Invalid ingredients"})
    }

    try {
        const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

        const { content } = await anthropic.messages.create({
            model: "claude-3-haiku-20240307",
            max_tokens: 1024,
            system: SYSTEM_PROMPT,
            messages: [
                {
                    role: "user",
                    content: `Ingredients: ${ingredients.join (", ")}`,
                },
            ],
        })

        const recipeObj = JSON.parse(content[0].text)

        return res.status(200).json(recipeObj)
    } catch (err) {
        console.log("Antrhopic error:", err)
        return res.status(500).json({ message: "Failed to generate recipe" })
    } 
}
