// import { ProductContainer } from "@/Container";
import "./App.css";
import { Outlet } from "react-router-dom";
import { NavBar } from "@/Component";

function App() {
    return (
        <div className="app">
            <h1 className="text-gray-600 body-font font-orbitron">
                Account Registration Forms
            </h1>
            {/* <NavBar /> */}
            <Outlet />
            {/* <ProductContainer /> */}
        </div>
    );
}

export default App;
