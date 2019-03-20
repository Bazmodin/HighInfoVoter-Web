import React from 'react';
import ConfigService from '../../services/ConfigService';
import ProPublicaApiService from '../../services/ProPublicaApiService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pak: ''
        };
    }

    componentDidMount() {
        ConfigService.getByKey("PROPUBLICA_API_KEY", this.onGetApiKeySuccess, this.onError);
    }

    onGetApiKeySuccess = resp => {
        this.setState({
            pak: resp.data.Item.ConfigValue
        });
    }

    onGetSenatorsSuccess = resp => {
        
    }

    onGetRepresentativeSuccess = resp => {
        
    }

    onGetMemberSuccess = resp => {
        
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