export async function fetchRecipe(ingredients) {
    try {
        const response = await fetch("/api/ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ingredients }),
        })
        const data = await response.json() // parse JSON
        return data.recipe // the recipe text from the server
    } catch (error) {
        console.error("Error fetching recipe:", error)
    }
}