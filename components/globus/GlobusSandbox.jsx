import globus from './globus.js?raw'
import style from './style.css?raw'
import {Sandpack} from "@codesandbox/sandpack-react";

export default function GlobusSandbox({files, externalResources, options}) {
    return (
        <Sandpack
            customSetup={{
                dependencies: {
                    '@openglobus/og': '*',
                },
            }}
            options={{
                showNavigator: false,
                showLineNumbers: true,
                showTabs: true,
                closableTabs: true,
                editorHeight: 700,
                editorWidthPercentage: 40,
                ...options
            }}
            files={{
                "style.css": style,
                ...files,
                "globus.js": globus,
            }}
            externalResources={externalResources}
            theme="light"
            template="react"
        />
    )
}

