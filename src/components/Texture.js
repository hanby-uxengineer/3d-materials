import styled from "styled-components";
import { Suspense, useRef, useState } from "react";
import { TextureLoader } from "three";
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, useCursor } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import colorImg from "../textures/diff.jpeg"
import dispImg from "../textures/disp.jpeg"
import norImg from "../textures/nor.jpeg"
import roughImg from "../textures/rough.jpeg"
import aoImg from "../textures/ao.jpeg"

const StyledTexture = styled.div`
    width: 100%;
    height: 100%;
    background: white;
`;

function TextureSphere() {
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
        colorImg,
        dispImg,
        norImg,
        roughImg,
        aoImg,
    ]);

    const [{ wobble, scale }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        scale: clicked ? 0.5 : hovered ? 0.2 : 0.1
    }, [hovered, clicked]);

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
                <sphereGeometry args={[1.5, 64, 64]} />
                <a.meshStandardMaterial
                    displacementScale={scale}
                    map={colorMap}
                    displacementMap={displacementMap}
                    normalMap={normalMap}
                    roughnessMap={roughnessMap}
                    aoMap={aoMap}
                    metalness={0}
                    roughness={1}
                />
            </a.mesh>
        </Suspense>
    );
}

export default function Texture() {
    return (
        <StyledTexture>
            <Canvas>
                <OrbitControls />
                <ambientLight intensity={1} color='white' />
                <directionalLight position={[0, 0, 30]} intensity={1} color='white' />
                <TextureSphere />
                <Environment preset="warehouse" />
            </Canvas>
        </StyledTexture>
    )
}