import styled from "styled-components";
import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, useCursor } from '@react-three/drei';
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

const StyledDistort = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;

const AnimatedMaterial = a(MeshDistortMaterial);

function DistortSphere() {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    const [{ wobble, distort, roughness }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        distort: clicked ? 0.6 : hovered ? 0.2 : 0,
        roughness: clicked ? 0.1 : 0,
        config: (n) => n === 'wobble' && hovered && { mass: 1, tension: 100, friction: 10 }
    }, [hovered, clicked]);
    
    useCursor(hovered);

    useFrame((state) => {
        if (ref.current) {
                ref.current.position.x = THREE.MathUtils.lerp(ref.current.position.x, hovered ? state.mouse.x : 0, 0.2);
                ref.current.position.y = THREE.MathUtils.lerp(ref.current.position.y, hovered ? state.mouse.y : 0, 0.2);
        }
    });

    return (
        <Suspense fallback={null}>
            <a.mesh
                castShadow receiveShadow
                ref={ref}
                scale={wobble}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
                onClick={(event) => click(!clicked)}
            >
                <sphereGeometry args={[1.5, 64, 64]} />
                <AnimatedMaterial distort={distort} speed={3} roughness={roughness} color='black' />
            </a.mesh>
            <Environment preset="warehouse" />
        </Suspense>
    );
}

export default function Distort() {
    return (
        <StyledDistort>
            <Canvas>
                <ambientLight intensity={0} color='white' />
                <DistortSphere />
            </Canvas>
        </StyledDistort>
    )
}