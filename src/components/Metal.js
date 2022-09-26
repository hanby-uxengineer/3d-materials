import { useRef, useState, useEffect, Suspense } from 'react';
import styled from "styled-components";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls } from '@react-three/drei';
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import Spinner from "./Spinner";

const StyledMetal = styled.div`
    width: 100%;
    height: 100%;
`;

function MetalSphere(props) {
    const ref = useRef();
    const [{ wobble, color }] = useSpring({
        wobble: props.hovered ? 1.2: 1,
        color: props.hovered ? 'white': 'black',
        config: (n) => n === 'wobble' && props.hovered && { mass: 1, tension: 100, friction: 10 }
    }, [props.hovered]);

    return(
        <a.mesh
            castShadow receiveShadow
            ref={ref}
            scale={wobble}
        >
            <sphereGeometry args={[1.5, 64, 64]} />
            <a.meshPhysicalMaterial color={color} metalness={1} roughness={0} clearcoat={1} />
        </a.mesh>
    );
}

export default function Metal() {
    const [hovered, hover] = useState(false);

    useEffect(() => {
        document.body.style.cursor = hovered
        ? 'move'
        : 'unset'
    });

    return (
        <StyledMetal>
            <Suspense fallback={<Spinner />}>
                <Canvas 
                    onPointerOver={(event) => hover(true)} 
                    onPointerOut={(event) => hover(false)}
                >
                    <color attach="background" args={['black']} />
                    <OrbitControls autoRotate={hovered ? true : false} enableZoom={false} />
                    <Environment preset="night" />
                    <ambientLight intensity={1} color='white' />
                    <MetalSphere hovered={hovered} />
                </Canvas>
            </Suspense>
        </StyledMetal>
    );
}