import { useRef, useState, Suspense } from 'react';
import styled from "styled-components";
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Environment, useCursor, GradientTexture } from '@react-three/drei';
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import Spinner from "./Spinner";

const StyledDistort = styled.div`
    width: 100%;
    height: 100%;
`;

const AnimatedMaterial = a(MeshDistortMaterial);

function BgPlane() {
    return(
        <>
            <mesh position={[0, 0, -20]}>
                <planeGeometry args={[100, 50, 1]} />
                <meshBasicMaterial>
                    <GradientTexture
                    stops={[0, 1]}
                    colors={['white', 'gray']}
                    size={1024}
                    />
                </meshBasicMaterial>
            </mesh>
        </>
    );
}

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
        <a.mesh
            castShadow receiveShadow
            ref={ref}
            scale={wobble}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => {
                hover(false)
                click(false)
            }}
            onClick={(event) => click(!clicked)}
        >
            <sphereGeometry args={[1.5, 64, 64]} />
            <AnimatedMaterial distort={distort} speed={3} roughness={roughness} color='black' />
        </a.mesh>        
    );
}

export default function Distort() {
    return (
        <StyledDistort>
            <Suspense fallback={<Spinner />}>
                <Canvas>
                    <Environment preset="warehouse" />
                    <ambientLight intensity={0} color='white' />
                    <BgPlane />
                    <DistortSphere />
                </Canvas>
            </Suspense>
        </StyledDistort>
    )
}