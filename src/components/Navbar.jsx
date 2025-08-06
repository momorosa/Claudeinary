import { Link } from 'react-router-dom'
import { motion } from "framer-motion"

export default function Navbar() {
    return(
        <div className="w-screen h-[50px] flex justify-between px-8 py-6">
            <Link 
                to="/"
                aria-label='Go to intro page'
            >
                <motion.span
                    whileHover={{ rotate:-10, scale: 1.2}}
                    transition={{ type:"spring", stiffness:200 }}
                    className="material-icons cursor-pointer hover:text-white"
                >
                    home
                </motion.span>
            </Link>
            
            <div>
                ©2025 - {' '}
                <a 
                    href = "https://quietbold.com"
                    className = "md:w-64 cursor-pointer hover:text-white transition delay-150 duration-300 ease-in-out"
                    target = "_blank"
                    rel = "noreferrer noopener"
                >
                    Rosa Choi
                </a>
            </div>

        </div>
             
    )
}