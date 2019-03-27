import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import RepList from '../list/RepList';
import ConfigService from '../../services/ConfigService';
import ProPublicaApiService from '../../services/ProPublicaApiService';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pak: '',
            senators: [],
            congressperson: {}
        };
    }

    componentDidMount() {
        ConfigService.getByKey("PROPUBLICA_API_KEY", this.onGetApiKeySuccess, this.onError);
    }

    onGetApiKeySuccess = resp => {
        this.setState({
            pak: resp.data.Item.ConfigValue
        }, evt => {
            ProPublicaApiService.getSenators(this.props.state, this.state.pak, this.onGetSenatorsSuccess, this.onError);
            ProPublicaApiService.getCongressperson(this.props.state, this.props.district, this.state.pak, this.onGetCongresspersonSuccess, this.onError);
        });
    }

    onGetSenatorsSuccess = resp => {
        resp.data.results.forEach(senator => {
            this.setState({
                senators: [...this.state.senators, senator]
            });
        });
    }

    onGetCongresspersonSuccess = resp => {
        this.setState({
            congressperson: resp.data.results[0]
        })
    }

    onError = err => {
        console.error(err);
    }

    render() {
        const { senators } = this.state;
        const { congressperson } = this.state;
        return (
            <Container fluid
                style={{
                    height: "100%",
                    width: "100%"
                }}>
                <Row>
                    <Col
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center"
                        }}>
                        <RepList
                            senators={senators}
                            congressperson={congressperson}
                            state={this.props.state}
                            district={this.props.district}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        district: state.district,
        state: state.state
    }
}

export default connect(mapStateToProps)(HomePage);