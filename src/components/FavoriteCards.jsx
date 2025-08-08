import { motion, AnimatePresence } from "framer-motion"
import imagePlaceholder from '../assets/backgroundImg.png'


export default function FavoriteCards({ items, onToggle, onSelect }) {
    return(<>
            <div className="flex gap-4 overflow-x-auto pb-2
                 scroll-smooth snap-x snap-mandatory
                 scrollbar-thin scrollbar-thumb-gray-400">
                <AnimatePresence initial={ false }>
                    {items.map((r) => (
                        <motion.div 
                            key={ r.id } 
                            onClick={() => onSelect(r)}
                            className="relative flex-shrink-0 w-[260px] sm:w-[300px] snap-start bg-white rounded shadow-xl/20 cursor-pointer"
                            initial={{ opacity:0, x:40 }}
                            animate={{ opacity:1, x:0 }}
                            exit={{ opacity:0, x:40 }}
                            transition={{ duration:0.3 }}
                        >
                            <div className="px-4 py-4">
                                <img 
                                    src={ r. imageUrl }
                                    onError={(e) => (e.currentTarget.src = imagePlaceholder )}
                                    alt={ r.title }
                                    className="w-full h-32 object-cover rounded-lg"
                                />
                                <h2 className="font-semibold leading-snug p-3"> { r.title } </h2>
                                <span
                                    role="button"
                                    tabIndex={ 0 }
                                    onClick={() => onToggle(r)}
                                    className="material-icons absolute top-2 right-2 text-red-500 cursor-pointer group-hover:opacity-80 transition"
                                    aria-label="Remove favourite"
                                >
                                    favorite
                                </span>
                            </div>
                        </motion.div>
                    ))}       
                </AnimatePresence> 
        </div>
    </>
    )
}

