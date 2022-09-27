import { Suspense, useRef, useState } from "react";
import styled from "styled-components";
import { TextureLoader } from "three";
import { Canvas, useLoader } from '@react-three/fiber';
import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import colorImg from "../textures/diff.jpeg"
import dispImg from "../textures/disp.jpeg"
import norImg from "../textures/nor.jpeg"
import roughImg from "../textures/rough.jpeg"
import aoImg from "../textures/ao.jpeg"
import Spinner from "./Spinner";

const StyledTexture = styled.div`
    width: 100%;
    height: 100%;
`;

function TextureSphere(props) {
    const ref = useRef();
    const [colorMap, displacementMap, normalMap, roughnessMap, aoMap] = useLoader(TextureLoader, [
        colorImg,
        dispImg,
        norImg,
        roughImg,
        aoImg,
    ]);

    const [{ wobble, scale }] = useSpring({
        wobble: props.hovered ? 1.2 : 1,
        scale: props.hovered ? 0.5 : 0.1
    }, [props.hovered]);

    return (
        <a.mesh
            castShadow receiveShadow
            ref={ref}
            scale={wobble}
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
    );
}

export default function Texture() {
    const [hovered, hover] = useState(false);

    return (
        <StyledTexture>
            <Suspense fallback={<Spinner />}>
                <Canvas
                    onPointerOver={(event) => hover(true)}
                    onPointerOut={(event) => hover(false)}
                    style={{ cursor: 'move' }}
                >
                    <color attach="background" args={['white']} />
                    <Sky />
                    <OrbitControls enableZoom={false} />
                    <Environment preset="warehouse" />
                    <ambientLight intensity={1} color='white' />
                    <TextureSphere hovered={hovered} />
                </Canvas>
            </Suspense>
        </StyledTexture>
    )
}