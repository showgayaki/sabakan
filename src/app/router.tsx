import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { useMenuEvents } from "@/hooks/useMenuEvents";
import Home from "@/pages/home";
import License from "@/pages/license";

export function AppRouter() {
    return (
        <Router>
            <AppRoutes/>
        </Router>
    );
}

function AppRoutes() {
    useMenuEvents(); // Routerの中で呼ばないとダメ
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/license" element={<License />} />
        </Routes>
    )
}
