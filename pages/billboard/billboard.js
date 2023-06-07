'use strict';


import {Ellipsoid, Entity, EntityCollection, LonLat, Vec3, XYZ} from "@openglobus/og";
import globus from "./globus.js";


const src = 'data:image/png;base64,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\n';
function rnd(min, max) {
    return Math.random() * (max - min) + min;
}

let entities = [],
    colors = ['red', 'orange', 'yellow', 'green', 'lightblue', 'darkblue', 'purple']

for (let i = 0; i < 5000; i++) {
    entities.push(new Entity({
        'name': 'sat-' + i,
        'lonlat': [rnd(-180, 180), rnd(-90, 90), rnd(100000, 5000000)],
        'billboard': {
            src,
            'size': [24, 24],
            'color': colors[i % 7],
            'rotation': rnd(0, 360)
        },
        'properties': {
            'bearing': rnd(0, 360),
            'color': colors[i % 7]
        }
    }));
}

let carrots = new EntityCollection({
    'entities': entities,
    'scaleByDistance': [6000000, 24000000, 10000000000]
});

carrots.events.on("mouseenter", function (e) {
    let b = e.pickingObject.billboard;
    b.setColor(1, 1, 1);
});

carrots.events.on("mouseleave", function (e) {
    let b = e.pickingObject.billboard;
    b.setColorHTML(e.pickingObject.properties.color);
});

carrots.events.on("lclick", function (e) {
    e.pickingObject.billboard.remove();
});

let sat = new XYZ("MapQuest Satellite", {
    shininess: 20,
    specular: new Vec3(0.00048, 0.00037, 0.00035),
    diffuse: new Vec3(0.88, 0.85, 0.8),
    ambient: new Vec3(0.15, 0.1, 0.23),
    isBaseLayer: true,
    url: "//tileproxy.cloud.mapquest.com/tiles/1.0.0/sat/{z}/{x}/{y}.png",
    visibility: true,
    attribution: '@2014 MapQuest - Portions @2014 "Map data @ <a target="_blank" href="//www.openstreetmap.org/">OpenStreetMap</a> and contributors, <a target="_blank" href="//opendatacommons.org/licenses/odbl/"> CC-BY-SA</a>"'
});



globus.planet.events.on("draw", () => {
    carrots.each(function (e) {
        let c = e.getLonLat();
        let ll = globus.planet.ellipsoid.getBearingDestination(c, e.properties.bearing, 2000);
        e.properties.bearing = Ellipsoid.getFinalBearing(c, ll);
        e.setLonLat(new LonLat(ll.lon, ll.lat, c.height));
        e.billboard.setRotation(e.billboard.getRotation() + 0.01);
    });
});

carrots.addTo(globus.planet);

globus.planet.flyLonLat(new LonLat(54.5, 43.5, 20108312));