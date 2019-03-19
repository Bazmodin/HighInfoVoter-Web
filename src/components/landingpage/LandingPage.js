import React from "react";
import { Container, Row, Col, Button } from "reactstrap";

class LandingPage extends React.Component {
    

    render() {
        return (
            <div>
                <Container>
                    <Row>
                        <Col>
                            <div>Welcome to High Information Voter!</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div>Press the button to see your representatives.</div>
                            <Button color="primary">Go</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LandingPage;