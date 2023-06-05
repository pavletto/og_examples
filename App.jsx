// import globus from './globus.js'

import { Sandpack } from "@codesandbox/sandpack-react";

export default function App() {

    const files = {}

    return (
        <Sandpack
            files={files}
            theme="light"
            template="vanilla"
        />
    )
}