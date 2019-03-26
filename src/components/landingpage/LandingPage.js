import React from "react";
import { Container, Row, Col, Button } from "reactstrap";
import AddressModal from '../address/AddressModal';
import WebscrapeService from '../../services/WebscrapeService';

class LandingPage extends React.Component {

    onClick() {
        WebscrapeService.scrapeAll(resp => {console.log(resp)}, err => {console.error(err)});
    }

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
                            <Button color="danger" onClick={this.onClick}>SCRAPE ALL THE THINGS</Button>
                        </Col>
                    </Row>
                </Container>
            </div>
        );
    }
}

export default LandingPage;