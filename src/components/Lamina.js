import { Suspense, useRef, useState } from "react";
import styled from "styled-components";
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, useCursor } from "@react-three/drei";
import { useSpring } from "@react-spring/web";
import { a } from "@react-spring/three";
import { LayerMaterial, Depth, Fresnel, Noise } from 'lamina'
import Spinner from "./Spinner";

const StyledLamina = styled.div`
    width: 100%;
    height: 100%;
`;

const AnimatedSphere = a(Sphere);
const AnimatedFresnel = a(Fresnel);

function LaminaSphere() {
    const gradient = 0.1;
    const ref = useRef();
    const [hovered, hover] = useState(false);
    const [clicked, click] = useState(false);
    const [time, setTime] = useState(0);
    const [{ wobble, power }] = useSpring({
        wobble: clicked ? 1.2 : hovered ? 1.05 : 1,
        power: (clicked || hovered) ? 1.5 : 10
    }, [hovered, clicked]);

    useFrame((state) => {
        if(clicked) {
            setTime(time + 0.05);
        }

        const sin = Math.sin(time);
        const cos = Math.cos(time/2);

        ref.current.layers[0].origin.set(cos, 0, 0);
        ref.current.layers[1].origin.set(cos, sin, cos);
        ref.current.layers[2].origin.set(sin, cos, sin);
        ref.current.layers[3].origin.set(cos, sin, cos);
    });

    useCursor(hovered);

    return (
        <AnimatedSphere 
            args={[1.5, 64, 64]}
            scale={wobble}
            onPointerOver={(event) => hover(true)}
            onPointerOut={(event) => {
                hover(false)
                click(false)
            }}
            onClick={(event) => click(!clicked)}
        >
            <LayerMaterial ref={ref} toneMapped={false}>
            <Depth colorA="deeppink" colorB="black" alpha={1} mode="normal" near={0.5 * gradient} far={0.5} origin={[0, 0, 0]} />
                <Depth colorA="lime" colorB="orange" alpha={1} mode="add" near={2 * gradient} far={2} origin={[0, 1, 0]} />
                <Depth colorA="blue" colorB="green" alpha={1} mode="add" near={3 * gradient} far={3} origin={[1, 0, 1]} />
                <Depth colorA="white" colorB="red" alpha={1} mode="overlay" near={1.5 * gradient} far={1.5} origin={[1, 1, 1]} />
                <AnimatedFresnel mode="add" color="white" intensity={1} power={power} bias={0.05} />
                <Noise scale={1000} colorA="white" colorB="gray" mode="subtract" alpha={0.2} />
            </LayerMaterial>
        </AnimatedSphere>
    );
}

export default function Lamina() {
    return (
        <StyledLamina>
            <Suspense fallback={<Spinner />}>
                <Canvas>
                    <color attach="background" args={['rgb(30, 60, 60)']} />
                    <ambientLight intensity={0.1} color='white' />
                    <LaminaSphere />
                </Canvas>
            </Suspense>
        </StyledLamina>
    )
}