import { Suspense, useRef, useState } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, useCursor } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { LayerMaterial, Depth, Fresnel } from 'lamina'
import Spinner from "./Spinner";

const StyledLamina = styled.div`
    width: 100%;
    height: 100%;
`;

const AnimatedSphere = a(Sphere);

function LaminaSphere() {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const [gradient, setGradient] = useState(0.1);
    const [{ wobble }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1
    }, [hovered, clicked]);

    useFrame((state) => {
        const sin = Math.sin(state.clock.elapsedTime / 2);
        const cos = Math.cos(state.clock.elapsedTime / 2);
        ref.current.layers[0].origin.set(cos / 2, 0, 0);
        ref.current.layers[1].origin.set(cos, sin, cos);
        ref.current.layers[2].origin.set(sin, cos, sin);
        ref.current.layers[3].origin.set(cos, sin, cos);
    });

    useCursor(hovered);

    return (
        <AnimatedSphere 
            args={[1.5, 64, 64]} 
            scale={wobble}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}
            onClick={(event) => click(!clicked)}
        >
            <LayerMaterial ref={ref} toneMapped={false}>
            <Depth colorA="#ff0080" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
            <Depth colorA="green" colorB="#f7b955" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, -1]} />
            <Depth colorA="blue" colorB="#f7b955" alpha={1} mode="add" near={3 * gradient} far={3} origin={[0, 1, 1]} />
            <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, -1, -1]} />
            <Fresnel mode="add" color="white" intensity={0.5} power={1.5} bias={0.05} />
            </LayerMaterial>
        </AnimatedSphere>
    );
}

export default function Lamina() {
    return (
        <StyledLamina>
            <Suspense fallback={<Spinner />}>
                <Canvas>
                    <color attach="background" args={['white']} />
                    <OrbitControls />
                    <ambientLight intensity={0} color='white' />
                    <LaminaSphere />
                </Canvas>
            </Suspense>
        </StyledLamina>
    )
}