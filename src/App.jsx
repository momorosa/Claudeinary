import { Routes, Route, useNavigate } from 'react-router-dom'
import Intro from './pages/Intro.jsx'
import Claudeinary from './pages/Claudeinary.jsx'

function App() {
    // const navigate = useNavigate()

    return (
        <>
            <Routes>
                <Route
                    path="/" 
                    element={ <Intro />}
                />
                <Route 
                    path="/claudeinary"
                    element={ <Claudeinary />}
                />
            </Routes>
        </>
    )
}

export default App
