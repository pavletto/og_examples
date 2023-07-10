import globus from './globus.js';
import {Entity, EntityCollection, Object3d, utils} from "@openglobus/og";
import {useEffect, useState} from "react";

export default function App() {
    const [count, setCount] = useState(10)
    const [init, setInit] = useState(false)
    const [entities, setEntities] = useState([])
    const [config, setConfig] = useState({})


    function rnd(min, max) {
        return Math.random() * (max - min) + min;
    }

    let colors = ["red", "orange", "yellow", "green", "lightblue", "darkblue", "purple"];


    useEffect(() => {
        let geoObjects = new EntityCollection({
            entities,
            scaleByDistance: [25, 400000, 1]
        });
        let ENTITY_OPTIONS = new Map([
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
        const types = [...ENTITY_OPTIONS.keys()].reduce((acc, name) => {
            return [...acc, ...new Array(ENTITY_OPTIONS.get(name).countRation).fill(name)];
        }, []);
        console.log(config)
        if (!init) {


            for (const [name, entity_opt] of ENTITY_OPTIONS) {

                Object3d.loadObj(`https://pavletto.github.io/og_resources/geo_object/penguin.obj`).then(objs => {

                    objs.forEach((object3d) => {
                        const entitiesArr = [];
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
                        const c = (i) => {
                            const o = defaultOptions(i);
                            return {
                                ...o,
                                ...(entity_opt && entity_opt.cb ? entity_opt.cb(o, i) : {})
                            };
                        }
                        setConfig({
                            ...config,
                            [name]: c
                        })

                        for (let i = 0; i < count; i++) {
                            entitiesArr.push(new Entity(c(i)));
                        }
                        setEntities(entitiesArr);
                        geoObjects.addEntities(entitiesArr);

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

            geoObjects.addTo(globus.planet);


            console.log(count)
            console.log('init')

            globus.attachTo('app');
            globus.start()
            setInit(true)
        } else {
            console.log(entities)
            if (entities.length !== count) {
                if (entities.length > 0) {
                    if (entities.length > count) {
                        while (entities.length > count) {
                            setEntities([...entities.filter((_, i) => i !== entities.length - 1)])
                            entities[entities.length - 1].remove();
                        }
                    } else if (entities.length < count) {
                        while (entities.length < count) {

                                const e = new Entity(config[types[entities.length % (types.length)]](entities.length - 1))
                                setEntities([...entities, e])
                                geoObjects.add(e);
                        }
                    }
                }
            }
        }

    }, [init, count, config, entities]);

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

