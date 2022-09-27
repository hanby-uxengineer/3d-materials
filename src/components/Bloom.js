import { useRef, useState, Suspense } from 'react';
import styled from "styled-components";
import * as THREE from 'three';
import { Canvas, extend } from '@react-three/fiber';
import { Effects, BakeShadows, Stars, OrbitControls } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { UnrealBloomPass } from 'three-stdlib';
import Spinner from "./Spinner";

extend({ UnrealBloomPass });

const StyledBloom = styled.div`
    width: 100%;
    height: 100%;
`;

function BloomSphere(props) {
    const glowColorA = new THREE.MeshBasicMaterial({ color: new THREE.Color(8, 0.4, 0), toneMapped: false });
    const glowColorB = new THREE.MeshBasicMaterial({ color: new THREE.Color(4, 0.2, 0), toneMapped: false });
    
    const ref = useRef();
    const [{ wobble, material }] = useSpring({
        wobble: props.hovered ? 1.2 : 1,
        material: props.hovered ? glowColorA : glowColorB
    }, [props.hovered]);

    return(
        <>
            <a.mesh
            castShadow receiveShadow
            material={material}
            ref={ref}
            scale={wobble}
            >
                <sphereGeometry args={[1.5, 64, 64]} />
            </a.mesh>
            <Effects disableGamma>
                <unrealBloomPass threshold={1} strength={1.0} radius={0.5} />
            </Effects>
        </>
    );
}

export default function Bloom() {
    const [hovered, hover] = useState(false);

    return (
        <StyledBloom>
            <Suspense fallback={<Spinner />}>
                <Canvas 
                    shadows gl={{ antialias: true }}
                    onPointerOver={(event) => hover(true)}
                    onPointerOut={(event) => hover(false)}
                    style={{ cursor: 'move' }}
                >
                    <color attach="background" args={['rgba(24, 36, 48, 1)']} />
                    <OrbitControls enableZoom={false} autoRotate={hovered ? true : false} />
                    { (hovered)
                        ? <Stars radius={30} depth={30} count={200} factor={3} fade speed={1} />
                        : <></>
                    }
                    <ambientLight intensity={0.1} />
                    <directionalLight castShadow intensity={0.2} shadow-mapSize={[1024, 1024]} shadow-bias={-0.0001} position={[10, 10, -10]} />
                    <BloomSphere hovered={hovered} />
                    <BakeShadows />
                </Canvas>
            </Suspense>
        </StyledBloom>
    )
}