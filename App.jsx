import {createBrowserRouter, RouterProvider} from "react-router-dom";
import "./App.css"
import routes from "./routes.js";

const router = createBrowserRouter(
    routes.map(({Element, ErrorBoundary, ...rest}) => {
        return {
            ...rest,
            element: <Element/>,
            ...(ErrorBoundary && {errorElement: <ErrorBoundary/>}),
        }
    })
);

function App() {

    return (
        <RouterProvider router={router}>

        </RouterProvider>
    )
}

export {App}