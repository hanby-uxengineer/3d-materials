import styled from "styled-components";
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";


const StyledMetal = styled.div`
    width: 100%;
    height: 100%;
    background: black;
`;

export default function Metal() {
    const ref = useRef();
    const [hovered, hover] = useState(false);

    const [{ wobble, color }] = useSpring({
        wobble: hovered ? 1.2: 1,
        color: hovered ? 'white': 'black',
        config: (n) => n === 'wobble' && hovered && { mass: 1, tension: 100, friction: 10 }
    }, [hovered]);

    useEffect(() => {
        document.body.style.cursor = hovered
        ? 'move'
        : 'unset'
    });

    return (
        <StyledMetal>
            <Canvas onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
                <OrbitControls autoRotate={hovered ? true : false} enableZoom={false} />
                <ambientLight intensity={1} color='white' />
                <Suspense fallback={null}>
                    <a.mesh
                        castShadow receiveShadow
                        ref={ref}
                        scale={wobble}
                    >
                        <sphereGeometry args={[1.5, 64, 64]} />
                        <a.meshPhysicalMaterial color={color} metalness={1} roughness={0} clearcoat={1} />
                    </a.mesh>
                    <Environment preset="night" />
                </Suspense>
                
            </Canvas>
        </StyledMetal>
    );
}