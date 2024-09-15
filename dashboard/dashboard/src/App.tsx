import { useState } from "react";
import { Button } from "./components/ui/button";
import "./App.css";
import SecondaryDashboard from "./BigComponents/SecondaryDashboard/SecondaryDashboard";

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <SecondaryDashboard />
        </>
    );
}

export default App;
