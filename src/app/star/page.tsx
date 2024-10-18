"use client";
import { Application, Sprite, Assets } from "pixi.js";
import { useEffect, useRef } from "react";
// import bunnyPng from "@/assets/bunny.png";
export default function About() {
    const ref = useRef<HTMLDivElement>(null);
    const init = async () => {
        console.log('init');

        const app = new Application();
        await app.init({ background: '#000', resizeTo: window });

        // 当元素存在时候，且没有子元素时候，添加canvas，能够保证每次只渲染一次app.canvas
        if (ref.current && !ref.current.hasChildNodes()) {
            // ref.current.appendChild(app.canvas);
            ref.current.appendChild(app.canvas);
        }


        const texture = await Assets.load('/star.png');

        const starAmount = 1000;
        let cameraz = 0;
        const fov = 20;
        const baseSpeed = 0.025;
        let speed = 0;
        let warpSpeed = 0;
        const starStretch = 5;
        const starBaseSize = 0.05;

        const stars: { z: number; x: number; y: number; sprite: Sprite; }[] = [];

        for (let i = 0; i < starAmount; i++) {
            const star = {
                sprite: new Sprite(texture),
                z: 0,
                x: 0,
                y: 0
            };

            star.sprite.anchor.x = 0.5;
            star.sprite.anchor.y = 0.7;
            randomizeStar(star, true);
            app.stage.addChild(star.sprite);
            stars.push(star);

        }

        function randomizeStar(star: { z: number; x: number; y: number; sprite: Sprite; }, initial: boolean) {
            star.z = initial ? Math.random() * 2000 : cameraz + Math.random() * 1000 + 2000;
            const deg = Math.random() * Math.PI * 2;
            const distance = Math.random() * 50 + 1;
            star.x = Math.cos(deg) * distance;
            star.y = Math.sin(deg) * distance;
        }

        setInterval(() => {
            warpSpeed = warpSpeed > 0 ? 0 : 1;
        }, 5000)

        app.ticker.add((delta) => {
            speed += (warpSpeed - speed) / 20;
            cameraz += delta.deltaTime * 10 * (speed + baseSpeed);
            for (let i = 0; i < starAmount; i++) {
                const star = stars[i];
                if (star.z < cameraz) randomizeStar(star, false);
                const z = star.z - cameraz;
                star.sprite.x = star.x * (fov / z) * app.screen.width + app.screen.width / 2;
                star.sprite.y = star.y * (fov / z) * app.screen.width + app.screen.height / 2;
                const dxCenter = star.sprite.x - app.screen.width / 2;
                const dyCenter = star.sprite.y - app.screen.height / 2;
                const distanceCenter = Math.sqrt(dxCenter * dxCenter + dyCenter * dyCenter);
                const distanceScale = Math.max(0, (2000 - z) / 2000);
                star.sprite.scale.x = distanceScale * starBaseSize;
                star.sprite.scale.y = distanceScale * starBaseSize + distanceScale * speed * starStretch * distanceCenter / app.screen.width;
                star.sprite.rotation = Math.atan2(dyCenter, dxCenter) + Math.PI / 2;
            }
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