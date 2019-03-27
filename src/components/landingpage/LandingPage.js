import React from "react";
import { Container, Row, Col } from "reactstrap";
import AddressModal from '../address/AddressModal';

class LandingPage extends React.Component {

    render() {
        return (
            <div>
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
                            <div>Welcome to High Information Voter!</div>
                            <AddressModal/>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LandingPage;