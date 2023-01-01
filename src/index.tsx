import "./index.css";

import { Component, lazy } from "solid-js";
import { Route, Router, Routes } from "@solidjs/router";

import { render } from "solid-js/web";

const Home = lazy(() => import("./pages/home"));
const Profile = lazy(() => import("./pages/profile"));
const FourOFour = lazy(() => import("./pages/fourOFour"));

const App: Component = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/profile/:name" element={<Profile />} />
            <Route path="*" element={<FourOFour />} />
        </Routes>
    );
};

render(
    () => (
        <Router>
            <App />
        </Router>
    ),
    document.getElementById("root") as HTMLElement
);
