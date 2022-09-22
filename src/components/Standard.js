import styled from "styled-components";
import { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

const StyledStandard = styled.div`
    width: 100%;
    height: 100%;
    background: rgb(10, 10, 10);
`;

function Sphere(props) {
    const ref = useRef()
    const [hovered, hover] = useState(false)
    const [clicked, click] = useState(false)
    const [{ wobble, color }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        color: clicked ? 'mediumslateblue' : hovered ? 'lightblue' : 'white',
        config: (n) => n === 'wobble' && hovered && { mass: 2, tension: 1000, friction: 10 }
    }, [hovered, clicked]);

    return (
        <a.mesh
            {...props}
            ref={ref}
            scale={wobble}
            onClick={(event) => click(!clicked)}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => hover(false)}>
            <sphereGeometry args={[1.5, 64, 64]} />
            <a.meshStandardMaterial color={color} />
        </a.mesh>
    )
}

export default function Standard() {
    return (
        <StyledStandard>
            <Canvas>
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <Float floatIntensity={4} rotationIntensity={0} speed={10}>
                    <Sphere position={[0, 0, 0]} />
                </Float>

            </Canvas>
        </StyledStandard>
    )
}