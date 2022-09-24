import styled from "styled-components";
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Cloud, Environment, Float } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

const StyledPhysical = styled.div`
    width: 100%;
    height: 100%;
`;


function Physical() {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [{ wobble, transmission }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        transmission:  clicked ? 1 : hovered ? 0.98 : 0.95
    }, [hovered, clicked]);

    useEffect(() => {
        document.body.style.cursor = hovered
        ? 'pointer'
        : 'unset'
    });

    return (
        <StyledPhysical>
            <Canvas>
                <ambientLight intensity={0.2} color='white' />
                <Suspense fallback={null}>
                    <Float floatIntensity={4} rotationIntensity={0} speed={clicked ? 10 : 0}>
                        <a.mesh
                            ref={ref}
                            scale={wobble}
                            castShadow
                            onClick={(event) => click(!clicked)}
                            onPointerOver={(event) => hover(true)}
                            onPointerOut={(event) => hover(false)}
                        >
                            <sphereGeometry args={[1.5, 64, 64]} />
                            <a.meshPhysicalMaterial color='white' transmission={transmission} opacity={1} metalness={0} roughness={1} clearcoat={1} clearcoatRoughness={0} ior={2} thickness={1} specularIntensity={1} specularColor='white' envMapIntensity={1} exposure={1} />
                        </a.mesh>
                        <Environment preset="sunset" />
                    </Float>
                    <mesh position={[0, 0, -20]}>
                        <planeGeometry args={[50, 50, 1]} />
                        <meshStandardMaterial color='royalblue' />
                    </mesh>
                    <Cloud castShadow receiveShadow position={[-12, 12, -10]} speed={0.5} opacity={0.8} />
                    <Cloud castShadow receiveShadow position={[12, -12, -10]} speed={0.5} opacity={0.8} />
                </Suspense>
            </Canvas>
        </StyledPhysical>
    )
}

export default Physical;