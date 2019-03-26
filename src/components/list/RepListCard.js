import React from 'react';
import { Container, Row, Col, ListGroupItem, Media } from 'reactstrap';


class RepListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            portrait: ''
        }
    }

    componentDidMount(){
        this.setState({
            portrait: this.props.rep.portrait
        })
    }

    render() {
        console.log(this.props);
        const { portrait } = this.state;
        return (
            <ListGroupItem>
                <Media>
                    <Media left href="#">
                    <Media object src={portrait} alt="placeholder"
                        style={{
                            maxWidth: "200px",
                            maxHeight: "200px"
                        }}/>
                    </Media>
                    <Container>
                        <Media body
                            style={{
                                padding: "20px"
                            }}>
                            <Row>
                                <Col>
                                    <Media heading>{this.props.rep.role} {this.props.rep.name}</Media>
                                </Col>
                            </Row>
                            <hr/>
                            <Row>
                                <Col>
                                    <p>Party: {this.props.rep.party}</p>
                                    {this.props.district ? <p>District: {this.props.district}</p> : ''}
                                    {this.props.state ? <p>State: {this.props.state}</p> : ''}
                                </Col>
                                <Col>
                                    <p>Gender: {this.props.rep.gender}</p>
                                    <p>Next Election: {this.props.rep.next_election}</p>
                                </Col>
                            </Row>
                        </Media>
                    </Container>
                </Media>
            </ListGroupItem>
        );
    }
}

export default RepListCard;