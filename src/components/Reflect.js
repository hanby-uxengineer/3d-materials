import styled from "styled-components";
import * as THREE from 'three';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { MeshReflectorMaterial, Environment, useCursor } from '@react-three/drei';
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";

const StyledReflect = styled.div`
    width: 100%;
    height: 100%;
    background: rgb(47, 43, 47);
`;

function ReflectPlane() {
    return(
        <mesh position={[0, -1.8, 0]} rotation={[-Math.PI / 2, 0, 0]}>
            <planeGeometry args={[50, 50]} />
            <MeshReflectorMaterial
                blur={[400, 200]}
                resolution={1024}
                mixBlur={1}
                mixStrength={15}
                depthScale={1}
                minDepthThreshold={0.850}
                color="rgb(35, 30, 30)"
                metalness={0.5}
                roughness={1}
            />
        </mesh>
    );
}

function ReflectSphere() {
    const ref = useRef();
    const group = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);

    const [{ wobble }] = useSpring({
        wobble: clicked ? 1.8 : hovered ? 1.575 : 1.5
    }, [hovered, clicked]);

    useFrame((state) => {
        if(group.current) {
            group.current.children[0].position.x = THREE.MathUtils.lerp(
                group.current.children[0].position.x,
                clicked ? 8 : hovered ? -8 : -30,
                0.02);
            group.current.children[1].position.x = THREE.MathUtils.lerp(
                group.current.children[1].position.x,
                clicked ? -4 : hovered ? 4 : 15,
                0.02);
        }
    });
    
    useCursor(hovered);

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
                <sphereGeometry args={[1, 64, 64]} />
                <meshPhysicalMaterial depthWrite={false} transmission={1} thickness={100} roughness={0.75} />
            </a.mesh>
            <group ref={group}>
                <mesh castShadow position={[-30, 4.2, -15]} scale={6}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial color="royalblue" roughness={1} />
                </mesh>
                <mesh castShadow position={[15, 0.2, -5]} scale={2}>
                    <sphereGeometry args={[1, 64, 64]} />
                    <meshStandardMaterial color="cornflowerblue" roughness={1} />
                </mesh>
            </group>
            <ReflectPlane />
            <Environment preset="city" />
        </Suspense>
    );
}

export default function Reflect() {
    return (
        <StyledReflect>
            <Canvas>
                <ambientLight intensity={0.5} color='white' />
                <pointLight position={[10, 10, -10]} />
                <pointLight position={[-10, -10, -10]} color="hotpink" />
                <ReflectSphere />
            </Canvas>
        </StyledReflect>
    )
}