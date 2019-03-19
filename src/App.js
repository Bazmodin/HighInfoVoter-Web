import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import LandingPage from './components/landingpage/LandingPage';
import HomePage from './components/homepage/HomePage';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route exact path="/" component={LandingPage} />
                    <Route path="/homepage" component={HomePage} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
