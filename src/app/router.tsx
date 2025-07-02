import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/home/index";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
            </Routes>
        </Router>
    );
}
