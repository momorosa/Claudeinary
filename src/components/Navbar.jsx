import { Link } from 'react-router-dom'

export default function Navbar() {
    return(
        <div className="w-screen h-[50px] flex justify-between px-8 py-6">
            <Link 
                to="/"
                aria-label='Go to intro page'
            >
                <span className="material-icons cursor-pointer hover:text-white hover:scale-125 transition delay-150 duration-300 ease-in-out">
                    home
                </span>
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