import globus from './globus.js';
import {Entity, EntityCollection, Globe, Object3d, utils} from "@openglobus/og";
import {useEffect, useState} from "react";

export default function App() {
    const [count, setCount] = useState(10)
    let g = null;
    useEffect(() => {
        if (!g) {
            let ENTITY = {},
                ENTITY_OPTIONS = new Map([
                    ['penguin', {
                        countRation: 1,
                        cb: (options) => {
                            options.geoObject.scale = 20;
                            return {
                                ...options,
                                lonlat: [rnd(-180, 180), rnd(-180, 180), 200000]
                            };
                        }
                    }]
                ]);

            g = new Globe(globus);

            function rnd(min, max) {
                return Math.random() * (max - min) + min;
            }

            let colors = ["red", "orange", "yellow", "green", "lightblue", "darkblue", "purple"];

            let geoObjects = new EntityCollection({
                entities: [],
                scaleByDistance: [25, 400000, 1]
            });

            for (const [name, entity_opt] of ENTITY_OPTIONS) {

                Object3d.loadObj(`https://pavletto.github.io/og_resources/geo_object/penguin.obj`).then(objs => {

                    objs.forEach((object3d) => {
                        const entities = [];
                        // object3d.src = 'https://pavletto.github.io/og_resources/geo_object/penguin.png'
                        const defaultOptions = (i) => ({
                            name: "sat-" + i,
                            geoObject: {
                                scale: 1,
                                instanced: true,
                                tag: name,
                                color: colors[i % 7],
                                object3d
                            },
                            'properties': {
                                'color': colors[i % 7]
                            }
                        });


                        ENTITY[name] = (i) => {
                            const o = defaultOptions(i);
                            return {
                                ...o,
                                ...(entity_opt && entity_opt.cb ? entity_opt.cb(o, i) : {})
                            };
                        };

                        for (let i = 0; i < count; i++) {
                            entities.push(new Entity(ENTITY[name](i)));
                        }
                        geoObjects.addEntities(entities);

                    });
                });
            }

            geoObjects.events.on("lclick", function (e) {
                e.pickingObject.geoObject.remove();
            });

            geoObjects.events.on("mouseenter", function (e) {
                let en = e.pickingObject, b = en.geoObject;
                b.setColor(1, 1, 1);
            });
            geoObjects.events.on("mouseleave", function (e) {
                let en = e.pickingObject, b = en.geoObject;
                b.setColor4v(utils.htmlColorToRgba(en.properties.color));
            });

            geoObjects.addTo(g.planet);

            const types = [...ENTITY_OPTIONS.keys()].reduce((acc, name) => {
                return [...acc, ...new Array(ENTITY_OPTIONS.get(name).countRation).fill(name)];
            }, []);
            g.planet.events.on("draw", () => {
                const entities = geoObjects._entities;
                if (entities.length > 0) {
                    if (entities.length > count) {
                        while (entities.length > count) {
                            entities[entities.length - 1].remove();
                        }
                    } else if (entities.length < count) {
                        while (entities.length < count) {
                            geoObjects.add(new Entity(ENTITY[types[entities.length % (types.length)]](entities.length - 1)));
                        }
                    }
                }

            });

        }
    }, [])


    // const div = document.createElement('div');
    // div.style.setProperty('display', 'flex');
    // div.style.setProperty('flex-direction', 'column');
    // div.style.setProperty('position', 'absolute');
    // div.style.setProperty('top', '10px');
    // div.style.setProperty('left', '10px');
    // div.style.setProperty('color', 'white');
    // div.style.setProperty('background', `rgba(0, 0, 0, .7)`);
    // document.body.appendChild(div);
    //
    // const span = document.createElement('span');
    // span.setAttribute('id', 'instance-count');
    // span.innerText = `Instance count: ${count}`;
    // div.appendChild(span);
    //
    // const range = document.createElement('input');
    // range.setAttribute('type', 'range');
    // range.setAttribute('min', '1');
    // range.setAttribute('value', '1');
    // range.setAttribute('max', '2000');
    // range.addEventListener('input', () => {
    //     count = parseInt(range.value);
    // });
    // div.appendChild(range);


    return (
        <div id="app">
            <div>
                <input type="range" min="1" max="2000" onChange={(event) => {
                    setCount(parseInt(event.target.value))
                }}/>
                <span>{count}</span>
            </div>
        </div>
    );
}

