import React from 'react';
import { Container, Row, Col, ListGroupItem, Media } from 'reactstrap';
import AwsS3Service from '../../services/AwsS3Service';

class RepListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    }

    componentDidMount(){
        if(this.props.rep.name) {
            var key = this.props.rep.name.replace(' ', '_') + '.jpg'
            AwsS3Service.selectByKey(key, this.onGetUrlSuccess, this.onError);
        }
    }

    componentWillReceiveProps(){
        if(this.props.rep.name) {
            var key = this.props.rep.name.replace(' ', '_') + '.jpg'
            AwsS3Service.selectByKey(key, this.onGetUrlSuccess, this.onError);
        }
    }

    onGetUrlSuccess = resp => {
        console.log("yeeyah", resp);
        this.setState({
            url: resp.data.Item.SignedUrl
        })
    }

    onError = err => {
        console.error(err)
    }

    render() {
        console.log(this.props.rep)
        const { url } = this.state;
        return (
            <ListGroupItem>
                <Media>
                    <Media left href="#">
                    <Media object src={url} alt="placeholder"
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