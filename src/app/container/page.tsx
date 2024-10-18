"use client";
import { Application, Sprite, Assets, Container } from "pixi.js";
import { useEffect, useRef } from "react";
// import bunnyPng from "@/assets/bunny.png";

// Container useage
export default function Page() {
    const ref = useRef<HTMLDivElement>(null);
    const init = async () => {
        console.log('init');

        const app = new Application();
        await app.init({ background: '#1099bb', resizeTo: window, width: 100, height: 100 });

        // 当元素存在时候，且没有子元素时候，添加canvas，能够保证每次只渲染一次app.canvas
        if (ref.current && !ref.current.hasChildNodes()) {
            // ref.current.appendChild(app.canvas);
            ref.current.appendChild(app.canvas);
        }

        const container = new Container();

        app.stage.addChild(container);

        for (let i = 0; i < 25; i++) {
            const bunny = new Sprite(await Assets.load('/bunny.png'));

            bunny.anchor.set(0.5); // 设置锚点为中间点
            bunny.x = (i % 5) * 40;
            bunny.y = Math.floor(i / 5) * 40;
            container.addChild(bunny);

            // app.ticker.add((time) => {
            //     bunny.rotation += 0.1 * time.deltaTime;
            // });
        }

        container.x = app.screen.width / 2;
        container.y = app.screen.height / 2;

        // container.pivot.x = container.width / 2;
        // container.pivot.y = container.height / 2;

        container.pivot.set(container.width / 2, container.height / 2);
        app.ticker.add((time) => {
            container.rotation -= 0.01 * time.deltaTime
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