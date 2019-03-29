import React from "react";
import { Container, Row, Col } from "reactstrap";
import AddressModal from '../address/AddressModal';
import AwsS3Service from '../../services/AwsS3Service';
import '../../App.css';

class LandingPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: ''
        }
    }

    componentDidMount() {
        AwsS3Service.selectByKey('flag-backdrop.jpg', this.onGetBackdropSuccess, this.onError);
    }

    onGetBackdropSuccess = resp => {
        this.setState({
            backdrop: resp.data.Item.SignedUrl
        })
    }

    onError = err => {
        console.error(err);
    }

    render() {
        const { backdrop } = this.state;
        return (
            <div>
                <Container fluid
                    style={{
                        height: "100vh",
                        width: "100vw",
                        backgroundImage: `url(${backdrop})`
                    }}>
                    <Row>
                        <Col
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <h1 className="landing-page-header landing-page-text">High Info Voter</h1>
                            <br/>
                            <h3 className="landing-page-text">Only 37% of Americans can name their Congressperson.</h3>
                            <br/>
                            <br/>
                            <h3 className="landing-page-text">Only 23% of Americans can name one of their Senators.</h3>
                            <br/>
                            <br/>
                            <h3 className="landing-page-text">Only 58% of eligible voters cast a vote in the 2016 election.</h3>
                            <br/>
                            <br/>
                            <br/>
                            <br/>
                            <h5 className="landing-page-text">We can do better.</h5>
                            <br/>
                            <AddressModal/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LandingPage;