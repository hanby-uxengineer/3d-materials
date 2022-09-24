import styled from "styled-components";
import { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { ContactShadows } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

const StyledStandard = styled.div`
    width: 100%;
    height: 100%;
    background: linear-gradient(180deg, black 0%, black 70%, rgb(25, 25, 25) 100%);
`;

export default function Standard() {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const [{ wobble, color }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.03 : 1,
        color: clicked ? 'royalblue' : hovered ? 'cornflowerblue' : 'white',
        config: (n) => n === 'wobble' && hovered && { mass: 3, tension: 200, friction: 10 }
    }, [hovered, clicked]);
    
    useEffect(() => {
        document.body.style.cursor = hovered
        ? 'pointer'
        : 'unset'
    });

    return (
        <StyledStandard>
            <Canvas>
                <ambientLight intensity={0.5} color='white' />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1}  color='royalblue' intensity={1} />
                <pointLight position={[-10, -10, -10]} />
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
                        <a.meshStandardMaterial color={color} roughness={1} />
                    </a.mesh>
                </Suspense>
                <ContactShadows
                    rotation={[Math.PI / 2, 0, 0]}
                    position={[0, -2.4, 0]}
                    opacity={0.8}
                    width={5}
                    height={5}
                    blur={2.5}
                    far={2.4}
                    color={clicked ? 'royalblue' :  hovered ? 'cornflowerblue' : 'white'}
                />
            </Canvas>
        </StyledStandard>
    )
}
