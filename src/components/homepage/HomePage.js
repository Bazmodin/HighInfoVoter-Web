import React from 'react';
import ConfigService from '../../services/ConfigService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        console.log("Hi");
        ConfigService.getByKey("PROPUBLICA_API_KEY", this.onGetApiKeySuccess, this.onError);
    }

    onGetApiKeySuccess = resp => {
        console.log(resp);
    }

    onError = err => {
        console.error(err);
    }

    render() {
        return (
            <div>These are your reps</div>
        );
    }
}

export default HomePage;