import { useState } from 'react'
import LoadingMessage from './LoadingMessage.jsx'
import useClaudeLoader from '../useClaudeLoader.js'
import Button from './Button.jsx'

export default function IngredientsList({ ingredients, getRecipe })
{
    const [isLoading, setIsLoading] = useState(false)
    const loadingMessage = useClaudeLoader(isLoading)

    function handleGetRecipe() {
        setIsLoading(true);
        getRecipe().finally(() => setIsLoading(false)); // Ensures spinner disappears after Claude responds
    }

    const ingredientListItems = ingredients.map(ingredient => (
        <li className="py-2" key={ ingredient }>{ ingredient }</li>
    ))

    return(
        <>
            <section className="flex flex-col p-5 rounded bg-warm-gray text-white mt-2">
                <h2 className="text-lg inline-flex items-center gap-2 font-semibold">
                    <span className="material-icons">
                        kitchen
                    </span>
                    Ingredients on hand:
                </h2>
                <ul className="p-4 list-disc" aria-live="polite">{ ingredientListItems }</ul>
            </section>
            <section className="p-4 flex-auto content-center border-t border-warm-gray mt-2">
                {ingredients.length > 4 && 
                <div className="flex justify-between">
                    <div className="flex-col content-center">
                        <h2 className="text-lg font-semibold">Ready for a recipe?</h2>
                        <p>Generate a recipe from your list of ingredients.</p>
                    </div>

                    {isLoading ? (<LoadingMessage message={loadingMessage}/>
                    ) : (
                        <Button
                            onClick={ handleGetRecipe }
                            className="w-64 font-medium font-primary text-black border border-black px-8 py-2 rounded-full py-3 hover:bg-black hover:text-white cursor-pointer transition delay-150 duration-300 ease-in-out"
                            aria-label="Add ingredient"
                            leftIcon="restaurant"
                            iconSize="md-18"
                        >
                            Get a recipe
                        </Button>
                    )}
                </div>
                }
            </section>
        </>
    )
}
