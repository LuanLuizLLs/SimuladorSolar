import React from "react";
import { Routes, Route } from "react-router-dom";

import Main from "../pages/Main"
import Simulacao from "../pages/Simulacao";

export default function RoutesAll(props) {
    return (
        <Routes>
            <Route path="/" element={ <Main />} />
            <Route path="/simulacao" element={ <Simulacao /> } />
        </Routes>
    );
}