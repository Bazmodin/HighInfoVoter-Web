import React from "react";
import {
    Label,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Input,
    FormText,
    Alert
} from "reactstrap";
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import states from './states.json';
import GoogleApiService from '../../services/GoogleApiService';
import ConfigService from '../../services/ConfigService';

class AddressModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            gak: '',
            street: '',
            city: '',
            state: '',
            district: ''
        };
        this.toggle = this.toggle.bind(this);
    }

    componentDidMount() {
        ConfigService.getByKey('GOOGLE_API_KEY', this.onGetGakSuccess, this.onError);
        ConfigService.getByKey("PROPUBLICA_API_KEY", this.onGetPakSuccess, this.onError);
    }

    toggle() {
        if (this.state.open) {
            this.setState({
                open: false,
                street: '',
                city: '',
                state: '',
                district: ''
            });
        }
        this.setState({
            open: !this.state.open
        });
    }

    onGetGakSuccess = resp => {
        this.setState({
            gak: resp.data.Item.ConfigValue
        })
    }

    onGetPakSuccess = resp => {
        this.props.addPak(resp.data.Item.ConfigValue);
    }

    onGetDistrictSuccess = resp => {
        var district = resp.data.offices[0].name;
        this.props.addDistrict(district.split('-')[1]);
        this.props.addState(this.state.state);
        this.setState({
            district: district.split('-')[1]
        }, e => { this.reroute(); });
    }

    onError = err => {
        console.error(err);
    }

    handleSubmit = () => {
        var fullAddress = this.state.street + ' ' + this.state.city + ' ' + this.state.state;
        GoogleApiService.getDistrict(encodeURIComponent(fullAddress), this.state.gak, this.onGetDistrictSuccess, this.onError);
    }

    reroute = () => {
        this.props.history.push({
            pathname: '/homepage',
            data: [{
                state: this.state.state,
                district: this.state.district
            }]
        });
    }

    render() {
        return (
            <div>
                <Button color="primary" onClick={this.toggle}>
                    Get Started
                </Button>
                <Modal isOpen={this.state.open} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Enter Your Voting Address
                    </ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="street">Street</Label>
                                <Input 
                                    type="text"
                                    name="street"
                                    id="street"
                                    placeholder="1600 Pennsylvania Ave."
                                    value={this.state.street}
                                    onChange={e => this.setState({ street: e.target.value })}/>
                                <Label for="city">City</Label>
                                <Input 
                                    type="text"
                                    name="city"
                                    id="city"
                                    placeholder="Washington, DC"
                                    value={this.state.city}
                                    onChange={e => this.setState({ city: e.target.value })}/>
                                <Label for="state">State</Label>
                                <Input 
                                    type="select"
                                    name="state"
                                    id="state"
                                    value={this.state.state}
                                    onChange={e => this.setState({ state: e.target.value })}>
                                    {states.map(state => (
                                        <option key={state.abbreviation}>{state.abbreviation}</option>
                                    ))}
                                </Input>
                                <br/>
                                <FormText color="muted">This will help us find your representatives.</FormText>
                                <br/>
                                <Alert color="danger">We won't store this information.</Alert>
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                        <Button color="danger" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        addDistrict: (district) => { dispatch({ type: 'ADD_DISTRICT', district: district})},
        addState: (state) => { dispatch({ type: 'ADD_STATE', state: state})},
        addPak: (pak) => { dispatch({ type: 'ADD_PAK', pak: pak})}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(AddressModal));
