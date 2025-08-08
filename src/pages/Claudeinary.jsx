import { useState, useRef, useEffect } from "react"
import ClaudeRecipe from "../components/ClaudeRecipe.jsx"
import IngredientsList from "../components/IngredientsList.jsx"
import { fetchRecipe } from "../fetchAPI.js"
import { motion, AnimatePresence } from "framer-motion"
import Button from "../components/Button.jsx"
import Navbar from "../components/Navbar.jsx"
import FavoriteCards from "../components/FavoriteCards.jsx"
import FavRecipeModal from "../components/FavRecipeModal.jsx"

export default function Claudeinary() {
    const [ ingredients, setIngredients ] = useState([])
    const [ recipe, setRecipe ] = useState(null)
    const recipeSection = useRef(null)
    const [ selected, setSelected ] = useState(null)

    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites")
        return saved ? JSON.parse(saved) : []
    })

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        if (recipe !== "" && recipeSection.current !== null) {
            setTimeout(() => {
                recipeSection.current.scrollIntoView({ behavior: "smooth" })
            }, 100)
        }
    }, [recipe])

    useEffect(() => {
        function handleEsc(e) {
            if (e.key === "Escape") setSelected(null)
        }
        window.addEventListener("keydown", handleEsc)
        return () => window.removeEventListener("keydown", handleEsc)
    }, [])

    function toggleFavorite(recipe) {
        setFavorites((prev) => {
            const exists = prev.some((r) => r.id && r.id === recipe.id)
            return exists
                ? prev.filter((r) => r.id !== recipe.id)
                : [...prev, recipe]
        })
    }

    async function getRecipe() {
        try {
            const base = await fetchRecipe(ingredients);
            const imgRes = await fetch("/api/image", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ prompt: base.image_prompt }),
            })

            if (!imgRes.ok) {
                console.error("Image API error", await imgRes.text())
                return alert("Sorry, I couldn’t generate the photo.")
            }

            const imgData = await imgRes.json()
            const { url } = imgData

            if (!url) {
                console.error("Image API responded without a URL")
                return alert("Image generation failed.")
            }
                setRecipe({ id: crypto.randomUUID(), ...base, imageUrl: url })
        } catch (err) {
            console.error(err)
            alert("Oops! Couldn't generate your recipe.")
        }
    }

    function addIngredient(formData) {
        // Trim the input to remove extra whitespace
        const newIngredient = formData.get("ingredient").trim()

        // If the input is empty, return early without updating state.
        if (!newIngredient) return
        setIngredients((prevIngredients) => [...prevIngredients, newIngredient])
    }

    function handleResetApp() {
        setIngredients([])
        setRecipe(null)
    }

    return (
    <>
        <Navbar />
        <main className="max-w-[1024px] mx-auto h-auto mb-50 p-10 font-primary">
            <section className="flex flex-col font-primary p-4 border-b border-warm-gray">
                <h1 className="text-3xl md:text-3xl text-black drop-shadow-sm font-semibold">
                    Welcome to Chef Claude_
                </h1>
                <p className="text-1xl font-medium py-2">
                    Enter 5 ingredients you have at home, and let Chef Claude suggest a
                    delicious recipe complete with easy-to-follow cooking instructions!
                </p>
            </section>

            <AnimatePresence>
                {!recipe && (
                <motion.section
                    key="inputBar"
                    initial={{ opacity:1, y:0} }
                    exit={{ opacity:0, y:16 }}
                    transition={{ duration:0.3 }}
                    className="fixed bottom-4 inset-x-0 max-w-[1024px] mx-auto p-6 s:flex-col z-10"
                >
                    <div className="flex p-2">
                        <form
                            action={ addIngredient }
                            className="flex flex-col w-full mx-auto md:flex-row items-center content-center gap-4 px-4"
                        >
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
                </motion.section>)}

            </AnimatePresence>

        <AnimatePresence>
            {favorites.length > 0 && (
                <motion.section
                    key="favBar"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                    className="flex flex-col w-full my-4 border-b border-warm-gray"
                >
                    <div className="w-full pb-4 font-semibold">
                        My Favorites:
                        <p className="italic text-sm font-light text-warm-gray"> • Note: Images are cached by OpenAI for ~24 h. Old thumbnails fall back to a placeholder.</p>
                    </div>

                    <div className="flex justify-between mb-4">
                        <FavoriteCards
                            items={ favorites }
                            onToggle={ toggleFavorite }
                            onSelect={ setSelected }
                        />
                    </div>
                </motion.section>
            )}
        </AnimatePresence>

        <section className="mb-50">
            {ingredients.length > 0 && (
                <IngredientsList ingredients={ ingredients } getRecipe={getRecipe} />
            )}
        </section>

        <AnimatePresence>
            { selected && (
                <FavRecipeModal
                    recipe={ selected }
                    isFavorited={ favorites.some((f) => f.id === selected.id)}
                    onToggleFavorite={() => toggleFavorite(selected)}
                    onClose={() => setSelected(null)}
                    // className="max-w-[1024px] mx-auto h-auto"
                />

            )
            }
        </AnimatePresence>

        <AnimatePresence mode="wait">
            {recipe && (
                <motion.section
                    key={ recipe.id }
                    initial={{ opacity:0, y:32 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, y:-32 }}
                    transition={{ duration:.4 }}
                    ref={ recipeSection } 
                    className="mb-20"
                >
                    <ClaudeRecipe
                    ref={ recipeSection }
                    recipe={ recipe }
                    isFavorited={ favorites.some((f) => f.id === recipe.id) }
                    onToggleFavorite={() => toggleFavorite(recipe)}
                    />
                    <Button
                    onClick={handleResetApp}
                    className="w-full md:w-64 mt-4 inline-flex font-medium font-primary text-black py-3 hover:bg-black hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out"
                    aria-label="start a new recipe"
                    rightIcon="arrow_forward"
                    iconSize="md-18"
                    >
                        Start a new recipe
                    </Button>
                </motion.section>
            )}
        </AnimatePresence>
    </main>
    </>)
}
