import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import billboard from './billboard.js?raw'

export default function GeoObjectExample() {
    return (
        <GlobusSandbox files={{
            "index.js": billboard
        }}
        externalResources={[
            "https://pavletto.github.io/og_resources/geo_object/penguin.png"
        ]}/>
    )
}