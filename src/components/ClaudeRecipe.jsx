import { forwardRef, useState } from 'react'

export default forwardRef(function ClaudeRecipe({ recipe }, ref) {

    const [favorite, setFavorite] = useState(false)

    function toggleFavorite() {
        setFavorite(prev => !prev)
    }

    console.log(recipe)

    return (
        <section ref={ref} className="max-w-[1024px] mx-auto p-8 bg-warm-gray text-white rounded mt-2">
            <header className="flex flex-col">
                <div className="pb-4 italic">Chef Claude_ Recommends:</div>
                <div className="flex justify-between items-center content-center">
                    <h2 className="text-3xl md:text-4xl text-amber-400 drop-shadow-sm font-semibold">
                        { recipe.title }
                    </h2>
                    { recipe && 
                        <span
                            role="button"
                            tabIndex={ 0 }
                            aria-label={ favorite ? "Remove from favorites" : "Add to favorites" }
                            onClick={ toggleFavorite }
                            className={`material-icons hover:cursor-pointer select-none transition delay-150 duration-300 ease-in-out
                                        ${favorite ? "text-red-500" : "text-gray-300"}`}
                        >
                            { favorite ? "favorite" : "favorite_border" }
                        </span>
                    }
                </div>
            </header>
            <div className="flex">
                <img
                    className="py-6"
                    src={ recipe.imageUrl }
                />
            </div>
            <div className="flex flex-col my-4">
                <h2 className="text-xl font-semibold py-2">
                    <span className="material-icons px-2 align-middle">assignment</span>
                    Ingredients:
                </h2>
                <ul className="list-disc pl-6 my-2 text-lg">
                    { recipe.ingredients.map(i => <li key={ i }>{ i }</li>)}
                </ul>
            </div>
            <div className="flex flex-col my-2">
                <h2 className="text-xl font-semibold py-2">
                    <span className="material-icons px-2 align-middle">menu_book</span>
                    Cooking Steps:
                </h2>
                <ol className="list-decimal pl-6 leading-loose text-lg pb-4">
                    { recipe.steps.map((s, i) => <li key={ i }>{ s }</li>)}
                </ol>         
                <div className="py-6 text-cheese text-xl border-t border-cheese">
                    <div>
                        <span className="material-icons p-2 animate-bounce">room_service</span>
                    </div>
                    { recipe.description }
                </div>
            </div>
                
        </section>
    )
})