"use client";
import { Application, Sprite, Assets, Rectangle } from "pixi.js";
import { useEffect, useRef } from "react";

declare module "pixi.js" {
    interface Sprite {
        speed: number;
        direction: number;
        turningSpeed: number;
    }
}
export default function Page() {
    const ref = useRef<HTMLDivElement>(null);
    const init = async () => {
        console.log("init");

        const app = new Application();
        await app.init({ resizeTo: window });

        // 当元素存在时候，且没有子元素时候，添加canvas，能够保证每次只渲染一次app.canvas
        if (ref.current && !ref.current.hasChildNodes()) {
            ref.current.appendChild(app.canvas);
        }


        const texture = await Assets.load("/bunny.png");
        const aliens: Sprite[] = [];

        for (let i = 0; i < 25; i++) {
            const bunny = new Sprite(texture);
            bunny.anchor.set(0.5); // 设置锚点为中间点

            bunny.x = Math.random() * app.screen.width;
            bunny.y = Math.random() * app.screen.height;
            bunny.tint = Math.random() * 0xffffff;

            bunny.scale.set(0.5 + Math.random() * 0.5);
            bunny.rotation = Math.random() * Math.PI * 2;

            bunny.speed = Math.random() * 2 + 2;
            bunny.direction = Math.random() * Math.PI * 2;
            bunny.turningSpeed = Math.random() - 0.8;

            app.stage.addChild(bunny);
            aliens.push(bunny);

            app.ticker.add((time) => {
                bunny.rotation += 0.1 * time.deltaTime;
            });
        }

        const dudeBoundsPadding = 100;
        const dudeBounds = new Rectangle(
            -dudeBoundsPadding,
            -dudeBoundsPadding,
            app.screen.width + dudeBoundsPadding * 2,
            app.screen.height + dudeBoundsPadding * 2
        );

        console.log(dudeBounds);

        app.ticker.add(() => {
            for (let i = 0; i < aliens.length; i++) {
                const dude = aliens[i];
                dude.direction += dude.turningSpeed * 0.01;
                dude.x += Math.sin(dude.direction) * dude.speed;
                dude.y += Math.cos(dude.direction) * dude.speed;
                dude.rotation = -dude.direction - Math.PI / 2;

                if (dude.x < dudeBounds.x) {
                    dude.x += dudeBounds.width;
                } else if (dude.x > dudeBounds.x + dudeBounds.width) {
                    dude.x -= dudeBounds.width;
                }
                if (dude.y < dudeBounds.y) {
                    dude.y += dudeBounds.height;
                } else if (dude.y > dudeBounds.y + dudeBounds.height) {
                    dude.y -= dudeBounds.height;
                }
            }
        });
    };

    useEffect(() => {
        init();
    }, []);
    return <div ref={ref}></div>;
}
