import React from 'react';
import { Container, Row, Col, ListGroupItem, Media } from 'reactstrap';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AwsS3Service from '../../services/AwsS3Service';
import '../../App.css';

class RepListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: '',
            borderColor: 'white',
            party: 'Independent'
        }
    }

    componentDidMount(){
        if(this.props.rep.name) {
            var key = this.props.rep.name.replace(' ', '_') + '.jpg';
            AwsS3Service.selectByKey(key, this.onGetUrlSuccess, this.onError);
        }
        if (this.props.rep) {
            if(this.props.rep.party === "D") {
                this.setState({
                    borderColor: 'blue',
                    party: 'Democrat'
                })
            } else if(this.props.rep.party === "R"){
                this.setState({
                    borderColor: 'red',
                    party: 'Republican'
                })
            }
        }
    }

    onGetUrlSuccess = resp => {
        console.log("RepListCard.onGetUrlSuccess", resp);
        this.setState({
            url: resp.data.Item.SignedUrl
        })
    }

    onError = err => {
        console.error("RepListCard.onError",err)
    }

    render() {
        console.log(this.props)
        return (
            <ListGroupItem className="repContainer">
                <Media>
                    <NavLink to={'/rep/' + this.props.rep.id}>
                        <Media left href=''>
                            <Media object src={this.state.url} alt="placeholder"
                                style={{
                                    maxWidth: "200px",
                                    maxHeight: "200px",
                                    borderColor: this.state.borderColor,
                                    borderWidth: "10px",
                                    borderStyle: "solid"
                                }}/>
                                <br/>
                                <p style={{color: "black", textAlign: "center"}}>{this.state.party}</p>
                        </Media>
                    </NavLink>
                    
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
                                    {this.props.state ? <p>State: {this.props.state}</p> : ''}  
                                    {this.props.congressperson ? <p>District: {this.props.district}</p> : ''}
                                </Col>
                                <Col>
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

const mapStateToProps = (state, ownProps) => {
    return {
        district: state.district,
        state: state.state
    }
}

export default connect(mapStateToProps)(RepListCard);