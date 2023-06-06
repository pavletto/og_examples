import globus from './globus.js?raw'
import style from './style.css?raw'
import {Sandpack} from "@codesandbox/sandpack-react";

export default function Entry({entry, resources}) {
    const files = {
        ...resources,
        "style.css": style,
        "index.js": entry,
        "globus.js": globus
    }
console.log(files)
    return (
        <Sandpack
            customSetup={{
                dependencies: {
                    '@openglobus/og': '0.16.3',
                },
            }}
            options={{
                showNavigator: false,
                showLineNumbers: true,
                showTabs: true,
                closableTabs: true,
                editorHeight: 700,
                editorWidthPercentage: 40,
            }}
            files={files}
            theme="light"
            template="vanilla"
        />
    )
}

