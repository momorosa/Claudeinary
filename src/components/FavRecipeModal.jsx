import { motion } from 'framer-motion'
import ClaudeRecipe from './ClaudeRecipe'

export default function FavRecipeModal({ recipe, isFavorited, onToggleFavorite, onClose, }) {
    return(
        <motion.div
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 bg-black/60 flex items-start justify-center pt-10 z-[999]"
            onClick={ onClose }                   
        >
             <motion.div
                initial={{ scale: 0.9, y: 16 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 16 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}             
                className="max-w-[50vw] w-full max-h-[90vh] bg-warm-gray rounded p-6 overflow-y-auto shadow-xl"
            >
                <ClaudeRecipe
                    recipe={ recipe }
                    isFavorited={ isFavorited }
                    onToggleFavorite={ onToggleFavorite }
                />
            </motion.div>
        </motion.div>
    )
}