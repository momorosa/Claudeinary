import { Suspense } from 'react'
import { Loader, Html } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import UI from './components/UI.jsx'
import FloatingCheese from "./components/FloatingCheese.jsx"

function App() {
    return (
    <>
        <Canvas
            className="fixed inset-0 pointer-events-none"
            flat
            gl={{ antialias: false }}
            dpr={[1, 1.5]}
            camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: 95 }}
        >
            <color attach="background" args={["#ffbf40"]} />

            <Suspense fallback={<Html center>Loading…</Html>}>
                <FloatingCheese />
            </Suspense>
            
        </Canvas>   
        <Loader containerStyles={{ zIndex: 50 }} />
        <UI />    
    </>
  )
}

export default App
