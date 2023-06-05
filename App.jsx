import globus  from './globus.js?url'
console.log(globus)
import { Sandpack } from "@codesandbox/sandpack-react";
export default function App() {
    const files = {
        "style.css": `
            :root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -webkit-text-size-adjust: 100%;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}

#app {
  height: 100vh
}

        `,
        "index.js": `import globus from './globus.js'`,
        "globus.js":
        `import '@openglobus/og/css/og.css';
import './style.css';
import { Globe, utils } from '@openglobus/og';
import { GlobusTerrain } from '@openglobus/og/terrain';
import { XYZ } from '@openglobus/og/layer';

const  osm = new XYZ("OpenStreetMap", {
    isBaseLayer: true,
    url: "//{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    visibility: true,
    attribution: "Data @ OpenStreetMap contributors, ODbL"
});

function toQuadKey(x, y, z) {
    var index = '';
    for (var i = z; i > 0; i--) {
        var b = 0;
        var mask = 1 << (i - 1);
        if ((x & mask) !== 0) b++;
        if ((y & mask) !== 0) b += 2;
        index += b.toString();
    }
    return index;
}

const sat = new XYZ("sat", {
    isBaseLayer: true,
    subdomains: ['t0', 't1', 't2', 't3'],
    url: "https://ecn.{s}.tiles.virtualearth.net/tiles/a{quad}.jpeg?n=z&g=7146",
    visibility: true,
    attribution: \`<a href="http://www.bing.com" target="_blank"><img title="Bing Imagery" src="https://sandcastle.cesium.com/CesiumUnminified/Assets/Images/bing_maps_credit.png" alt="Bing"></a> © 2021 Microsoft Corporation\`,
    maxNativeZoom: 19,
    defaultTextures: [{ color: "#001522" }, { color: "#E4E6F3" }],
    shininess: 18,
    specular: [0.00063, 0.00055, 0.00032],
    ambient: "rgb(100,100,140)",
    diffuse: "rgb(450,450,450)",
    nightTextureCoefficient: 2.7,
    urlRewrite: function (s, u) {
        return utils.stringTemplate(u, {
            's': this._getSubdomain(),
            'quad': toQuadKey(s.tileX, s.tileY, s.tileZoom)
        });
    }
});
const  globus = new Globe({
    target: 'app',
    name: "Earth",
    terrain: new GlobusTerrain(),
    layers: [sat],
    autoActivate: true
});

globus.planet.atmosphereEnabled = true;
export default globus;
`
    }

    return (
        <Sandpack
            customSetup={{
                dependencies: {
                    '@openglobus/og': '0.16.3',
                },
            }}
            files={files}
            theme="light"
            template="vanilla"
        />
    )
}