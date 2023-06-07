import {routes} from "/App.jsx";

export default function GeoObjectExample() {
    return routes.map((route) =><a href={route.path}>{route.path}</a>)
}