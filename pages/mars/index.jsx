import GlobusSandbox from "/components/globus/GlobusSandbox.jsx";
import mars from './mars.js?raw'
export default function LayerExample() {
    return (
        <GlobusSandbox files={{
            "index.js": mars
        }}
        externalResources={[
        ]}/>
    )
}