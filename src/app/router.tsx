import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "@/pages/home/index";
import License from "@/pages/license/index";

export function AppRouter() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/license" element={<License />} />
            </Routes>
        </Router>
    );
}
