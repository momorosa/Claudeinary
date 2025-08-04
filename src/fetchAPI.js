export async function fetchRecipe(ingredients) {
    
    try {
        const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ingredients }),
        })

        const data = await res.json().catch(() => null)

        if (!res.ok) {
            const msg = data?.message || `API error(${ res.status })`
            throw new Error(msg)
        } 

        // We should get data = {title, ingredients, steps, image_prompt}
        return data

    } catch(err) {
        console.log("fetchRecipe error:", err)
        throw err
    }
}
