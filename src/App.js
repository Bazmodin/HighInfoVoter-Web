import React, { Component } from "react";
import { BrowserRouter } from "react-router-dom";

import LandingPage from "./components/landingpage/LandingPage";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <LandingPage />
            </BrowserRouter>
        );
    }
}

export default App;
