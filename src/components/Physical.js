import { useRef, useState, Suspense } from 'react';
import styled from "styled-components";
import { Canvas } from '@react-three/fiber';
import { Cloud, Environment, Float, useCursor } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import Spinner from "./Spinner";

const StyledPhysical = styled.div`
    width: 100%;
    height: 100%;
`;

function BgPlane() {
    return(
        <>
            <mesh position={[0, 0, -20]}>
                <planeGeometry args={[100, 100, 1]} />
                <meshStandardMaterial color='royalblue' />
            </mesh>
            <Cloud castShadow receiveShadow position={[-12, 12, -10]} speed={0.5} opacity={0.8} />
            <Cloud castShadow receiveShadow position={[12, -12, -10]} speed={0.5} opacity={0.8} />
        </>
    );
}

function PhysicalSphere() {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [{ wobble, transmission }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        transmission:  clicked ? 1 : hovered ? 0.98 : 0.95
    }, [hovered, clicked]);

    useCursor(hovered);

    return(
        <Float floatIntensity={4} rotationIntensity={0} speed={clicked ? 10 : 0}>
            <a.mesh
                ref={ref}
                scale={wobble}
                castShadow
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => {
                    hover(false)
                    click(false)
                }}
                onClick={(event) => click(!clicked)}
            >
                <sphereGeometry args={[1.5, 64, 64]} />
                <a.meshPhysicalMaterial color='white' transmission={transmission} opacity={1} metalness={0} roughness={1} clearcoat={1} clearcoatRoughness={0} ior={2} thickness={1} specularIntensity={1} specularColor='white' envMapIntensity={1} exposure={1} />
            </a.mesh>
        </Float>
    );
}

export default function Physical() {
    return (
        <StyledPhysical>
            <Suspense fallback={<Spinner />}>
                <Canvas>
                    <Environment preset="sunset" />
                    <ambientLight intensity={0.2} color='white' />
                    <BgPlane />
                    <PhysicalSphere />
                </Canvas>
            </Suspense>
        </StyledPhysical>
    );
}