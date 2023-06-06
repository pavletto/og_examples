import Entry from "./Entry.jsx";

import {createBrowserRouter, RouterProvider} from "react-router-dom";

const pages = import.meta.glob("./pages/**/*.jsx", {eager: true});

const routes = [];
for (const path of Object.keys(pages)) {
    const fileName = path.match(/\.\/pages\/(.*)\.jsx$/)?.[1];
    if (!fileName) {
        continue;
    }
    const normalizedPathName = fileName.includes("$")
        ? fileName.replace("$", ":")
        : fileName.replace(/\/index/, "");
    const route = normalizedPathName.toLowerCase(),
        code = await import(`./pages/${route}/${route}.js?raw`),
        res = await import(`./pages/${route}/resources.json`);
    const resources = {};
    for (const routeElement of res.default) {
        const path = `./pages/${route}/${routeElement}?raw`
        const code = await import(path);
        console.log(code.default, path)
        resources[routeElement] = code.default;
    }
    //
    // const a = await import(`./pages/${route}/**?raw`)
    // console.log(a)
    routes.push({
        code: code.default,
        resources,
        path: fileName === "index" ? "/" : `/${normalizedPathName.toLowerCase()}`,
        Element: pages[path].default,
        loader: pages[path]?.loader,
        action: pages[path]?.action,
        ErrorBoundary: pages[path]?.ErrorBoundary,
    });
}
const router = createBrowserRouter(
    routes.map(({Element, ErrorBoundary, ...rest}) => {
        return {
            ...rest,
            element: <Entry entry={rest.code} resources={rest.resources}/>,
            ...(ErrorBoundary && {errorElement: <ErrorBoundary/>}),
        }
    })
);

export default function App() {

    return (
        <RouterProvider router={router}>

        </RouterProvider>
    )
}