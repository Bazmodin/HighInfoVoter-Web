import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

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
                            <div>
                                Follow the link to see your representatives.
                            </div>
                            <Link to="/homepage">Home</Link>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LandingPage;
