"use client";
import { Application, Assets, MeshPlane } from "pixi.js";
import { useEffect, useRef } from "react";

export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const init = async () => {
        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window });

        // 当元素存在时候，且没有子元素时候，添加canvas，能够保证每次只渲染一次app.canvas
        if (ref.current && !ref.current.hasChildNodes()) {
            // ref.current.appendChild(app.canvas);
            ref.current.appendChild(app.canvas);
        }


        const texture = await Assets.load('/bg_grass.jpg');


        const plane = new MeshPlane({ texture: texture, width: 100, height: 100 });
        plane.width = app.screen.width + 100;
        plane.height = app.screen.height + 100;
        plane.x = -50;
        plane.y = -50;

        app.stage.addChild(plane);

        const { buffer } = plane.geometry.getAttribute('aPosition');

        let timer = 0;
        app.ticker.add(() => {
            // timer += 0.1 * time.deltaTime;
            for (let i = 0; i < buffer.data.length; i++) {
                buffer.data[i] += Math.sin(i + timer / 10) * 0.5;
                // buffer.data[i + 1] = Math.cos(i + timer) * 10;
            }
            buffer.update();
            timer++;
        });
    }

    useEffect(() => {
        init();
    }, [])
    return (
        <div ref={ref}>

        </div>
    );
}