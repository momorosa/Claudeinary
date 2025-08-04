import { useState, useRef, useEffect } from 'react'
import ClaudeRecipe from '../components/ClaudeRecipe.jsx'
import IngredientsList from '../components/IngredientsList.jsx'
import { fetchRecipe } from '../fetchAPI.js'
import Button from '../components/Button.jsx'

export default function Claudeinary() {
    const [ ingredients, setIngredients ] = useState([])
    const [ recipe, setRecipe ] = useState(null)
    const recipeSection = useRef(null)

    useEffect(() => {
        if(recipe !== "" && recipeSection.current !== null) {
            setTimeout(()=> {
                recipeSection.current.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }
    },[recipe])

    async function getRecipe() {
        try {
            const base = await fetchRecipe(ingredients)
            const imgRes = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: base.image_prompt })
            })

            console.log(imgRes)

            if(!imgRes.ok) {
                console.error("Image API error", await imgRes.text())
                return alert("Sorry, I couldn’t generate the photo.")
            }

            const imgData = await imgRes.json();
            console.log("IMAGE JSON ➜", imgData);   // <= add this
            const { url } = imgData;

            // const { url } = await imgRes.json()

            if(!url) {
                console.error("Image API responded without a URL")
                return alert("Image generation failed.")
            }

            setRecipe({ ...base, imageUrl: url })
        } catch (err) {
            console.error(err)
            alert("Oops! Couldn't generate your recipe.")
        }
    }

    function addIngredient(formData) 
    {
        // Trim the input to remove extra whitespace
        const newIngredient = formData.get("ingredient").trim()

        // If the input is empty, return early without updating state.
        if (!newIngredient) return
        setIngredients(prevIngredients => [ ...prevIngredients, newIngredient ])
    }

    function handleResetApp() {
        setIngredients([])
        setRecipe(null)
    }

    return(
        <main className="max-w-[1024px] mx-auto h-auto mb-50 p-10 font-primary">
            <section>
                {/* My Favorites will go here */}
            </section>
            <section className="flex flex-col font-primary p-4 border-b border-warm-gray">
                <h1 className="text-3xl md:text-3xl text-black drop-shadow-sm font-semibold">
                    Welcome to Chef Claude_
                </h1>
                <p className="text-1xl font-medium py-2">
                    Enter 5 ingredients you have at home, and let Chef Claude suggest a delicious recipe complete with easy-to-follow cooking instructions!
                </p>
            </section>
            {!recipe && <section className="fixed bottom-4 inset-x-0 max-w-[1024px] mx-auto p-6 s:flex-col z-10">
                <div className="flex p-2">
                    <form action={ addIngredient } className="flex flex-col w-full mx-auto md:flex-row items-center content-center gap-4 px-4">
                        <input 
                            type="text" 
                            placeholder="e.g. spinach"
                            aria-label="Add ingredient"
                            name="ingredient"
                            className="w-full md:flex-1 min-w-0 bg-white rounded-lg px-4 py-3 lg:max-w-[650px]"
                        />
                        <Button
                            type="submit"
                            className="w-full md:w-64 inline-flex font-medium font-primary text-black border border-black px-8 py-2 rounded-full py-3 hover:bg-black hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out"
                            aria-label="Add ingredient"
                            leftIcon="add"
                            iconSize="md-18"
                        >
                            Add ingredient
                        </Button>
                    </form>
                </div>
            </section>}
            <section>
                { ingredients.length > 0 && 
                <IngredientsList 
                    ingredients = { ingredients } 
                    getRecipe = { getRecipe }
                />}
            </section>
            {recipe && (
                <section ref={ recipeSection } className="mb-20">
                    <ClaudeRecipe ref={ recipeSection } recipe={ recipe }/>
                    <Button
                            onClick={ handleResetApp }
                            className="w-full md:w-64 mt-4 inline-flex font-medium font-primary text-black py-3 hover:bg-black hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out"
                            aria-label="start a new recipe"
                            rightIcon="arrow_forward"
                            iconSize="md-18"
                    >
                        Start a new recipe
                    </Button>
                </section>          
            )}
        </main>
    )
}