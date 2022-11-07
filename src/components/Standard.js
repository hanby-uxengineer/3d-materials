import { useRef, useState, Suspense } from 'react';
import styled from "styled-components";
import { Canvas } from '@react-three/fiber';
import { ContactShadows, GradientTexture, useCursor } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import Spinner from './Spinner';

const StyledStandard = styled.div`
    width: 100%;
    height: 100%;
`;

const AnimatedContactShadows = a(ContactShadows);

function GradientBackground() {
    return(
        <>
            <mesh position={[0, 0, -20]}>
                <planeGeometry args={[100, 50, 1]} />
                <meshBasicMaterial>
                    <GradientTexture
                    stops={[0, 0.8]}
                    colors={['darkslategray', 'rgba(24, 40, 40, 1)']}
                    size={1024}
                    />
                </meshBasicMaterial>
            </mesh>
        </>
    );
}

function StandardSphere() {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const [{ wobble, color }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        color: clicked ? 'salmon' : hovered ? 'lightpink' : 'white',
        config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    }, [hovered, clicked]);
    
    useCursor(hovered);

    return(
        <>
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
                <a.meshStandardMaterial color={color} roughness={1} />
            </a.mesh>
            <AnimatedContactShadows
                rotation={[Math.PI / 2, 0, 0]}
                position={[0, -2.4, 0]}
                opacity={0.8}
                width={5}
                height={5}
                blur={2.5}
                far={2.4}
                color={clicked ? 'salmon' :  hovered ? 'lightpink' : 'white'}
            />
        </>
    );
}

export default function Standard() {
    return (
        <StyledStandard>
            <Suspense fallback={<Spinner />}>
                <Canvas>
                    <ambientLight intensity={0.5} color='white' />
                    <pointLight position={[-10, 10, 10]} />
                    <GradientBackground />
                    <StandardSphere />
                </Canvas>
            </Suspense>
        </StyledStandard>
    )
}