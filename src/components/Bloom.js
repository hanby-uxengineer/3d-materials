import styled from "styled-components";
import { useRef, useState, useEffect, Suspense } from 'react';
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import { Effects, BakeShadows, Stars, OrbitControls } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { UnrealBloomPass } from 'three-stdlib';

extend({ UnrealBloomPass });

const StyledBloom = styled.div`
    width: 100%;
    height: 100%;
    background: black;
`;

export default function Bloom() {
    const glowMaterial = new THREE.MeshBasicMaterial({ color: new THREE.Color(7, 0.5, 0), toneMapped: false })
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [{ wobble }] = useSpring({
        wobble: hovered ? 1.2 : 1
    }, [hovered]);
    
    useEffect(() => {
        document.body.style.cursor = hovered
        ? 'grab'
        : 'unset'
    });

    return (
        <StyledBloom>
            <Canvas 
                shadows gl={{ antialias: true }}
                onPointerOver={(event) => hover(true)}
                onPointerOut={(event) => hover(false)}
            >
                <OrbitControls enableZoom={false} autoRotate />
                { (hovered)
                    ? <Stars radius={50} depth={50} count={100} factor={10} fade speed={1} />
                    : <></>
                }
                <color attach="background" args={['#000000']} />
                <ambientLight intensity={0.1} />
                <directionalLight castShadow intensity={0.2} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[10, 10, -10]} />
                <Suspense fallback={null}>
                    <a.mesh
                        castShadow receiveShadow
                        material={glowMaterial}
                        ref={ref}
                        scale={wobble}
                    >
                        <sphereGeometry args={[1.5, 64, 64]} />
                    </a.mesh>
                    <Effects disableGamma>
                        <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
                    </Effects>
                </Suspense>
                <BakeShadows />
            </Canvas>
        </StyledBloom>
    )
}