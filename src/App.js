import React, { Component } from 'react';
import { BrowserRouter, Route } from "react-router-dom";
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import LandingPage from './components/landingpage/LandingPage';
import HomePage from './components/homepage/HomePage';
import rootReducer from './reducers/rootReducer';

const store = createStore(rootReducer);

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div>
                        <Route exact path="/" component={LandingPage} />
                        <Route path="/homepage" component={HomePage} />
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
