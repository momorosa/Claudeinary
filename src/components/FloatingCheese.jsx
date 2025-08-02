import * as THREE from "three"
import { useRef, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { Detailed, Environment, useGLTF } from "@react-three/drei"
import { EffectComposer, DepthOfField } from "@react-three/postprocessing"

const GLB = '/models/cheese_wedge.glb'
useGLTF.preload(GLB)

export default function FloatingCheese({
  speed = 1.5,
  count = 80,
  depth = 80,
  easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)),
}) {
    return (
    <>
        <spotLight
          position={[10, 20, 10]}
          penumbra={1}
          decay={0}
          intensity={ 4 }
          color="orange"
        />
        
        { Array.from({ length: count }, (_, i) => (
            <CheeseSlice
                key={i}
                index={i}
                z={Math.round(easing(i / count) * depth)}
                speed={speed}
            /> ))
        }
        
        <Environment preset="sunset" />
        <EffectComposer disableNormalPass multisampling={0}>
            <DepthOfField
                target={[0, 0, 60]}
                focalLength={0.6}
                bokehScale={14}
                height={700}
            />
        </EffectComposer> 
    </>
    )
}

const CheeseSlice = ({ index, z, speed }) => {
    const ref = useRef();
    const { viewport, camera } = useThree();
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])

    // const { nodes, materials } = useGLTF("/models/cheese_wedge.glb")
    const { nodes, materials } = useGLTF(GLB)   // only here


    // Local component state, it is safe to mutate because it's fixed data
    const [data] = useState({
        // Randomly distributing the objects along the vertical
        y: THREE.MathUtils.randFloatSpread(height * 2),
        // This gives us a random value between -1 and 1, we will multiply it with the viewport width
        x: THREE.MathUtils.randFloatSpread(2),
        // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
        spin: THREE.MathUtils.randFloat(8, 12),
        // Some random rotations, Math.PI represents 360 degrees in radian
        rX: Math.random() * Math.PI,
        rZ: Math.random() * Math.PI,
        scale: THREE.MathUtils.randFloat(0.7, 1.3) 
    })

    useFrame((state, delta) => {
        // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
        // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
        // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
        if (delta < 0.1)
            ref.current.position.set(
            index === 0 ? 0 : data.x * width,
            (data.y += delta * speed),
            -z
            )
        // Rotate the object around
        ref.current.rotation.set(
            (data.rX += delta / data.spin),
            Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI,
            (data.rZ += delta / data.spin)
        )
        // If they're too far up, set them back to the bottom
        if (data.y > height * (index === 0 ? 4 : 1))
            data.y = -(height * (index === 0 ? 4 : 1))
    })

    const hero = index === 0
    const s = hero ? 1.6 : data.scale

    return (
        <Detailed ref={ref} distances={[0, 65, 80]} scale={[s, s, s]}>
            <mesh
                geometry={nodes.Object_2.geometry}
                material={materials.material_0}
            />
            <mesh
                geometry={nodes.Object_2.geometry}
                material={materials.material_0}
            />
            <mesh
                geometry={nodes.Object_2.geometry}
                material={materials.material_0}
            />
        </Detailed>
    )
}
