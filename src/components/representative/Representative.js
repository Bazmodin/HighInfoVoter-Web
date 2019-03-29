import React from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col, Jumbotron } from 'reactstrap';
import SiteNavBar from '../navbar/SiteNavBar';
import Vote from '../vote/Vote';
import ProPublicaApiService from '../../services/ProPublicaApiService';
import AwsS3Service from '../../services/AwsS3Service';
import '../../App.css';

class Representative extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: '',
            portrait: '',
            member: {},
            votes: [],
            borderColor: 'white'
        }
    }

    componentDidMount() {
        ProPublicaApiService.getMember(this.props.match.params.id, this.props.pak, this.onGetMemberSuccess, this.onError);
        AwsS3Service.selectByKey('flag-backdrop.jpg', this.onGetBackdropSuccess, this.onError);
        ProPublicaApiService.getRecentVotes(this.props.match.params.id, this.props.pak, this.onGetRecentVotesSuccess, this.onError);
    }

    onGetBackdropSuccess = resp => {
        this.setState({
            backdrop: resp.data.Item.SignedUrl
        })
    }

    onGetMemberSuccess = resp => {
        console.log(resp.data.results[0])
        this.setState({
            member: resp.data.results[0]
        }, () => {
            var name = this.state.member.first_name + '_' + this.state.member.last_name + '.jpg';
            AwsS3Service.selectByKey(name, this.onGetPortraitSuccess, this.onError);
            if(this.state.member.current_party === "D") {
                this.setState({
                    borderColor: 'blue'
                })
            } else if(this.state.member.current_party === "R"){
                this.setState({
                    borderColor: 'red'
                })
            }
        })
        
    }

    onGetPortraitSuccess = resp => {
        this.setState({
            portrait: resp.data.Item.SignedUrl
        })
    }

    onGetRecentVotesSuccess = resp => {
        this.setState({
            votes: resp.data.results[0].votes
        })
    }

    onError = err => {
        console.error(err);
    }

    

    render() {
        var role = [];
        if (this.state.member.roles) {
            role = this.state.member.roles[0]
        }
        return (
            <div>
                <SiteNavBar/>
                <Container fluid
                    style={{
                        backgroundSize: "100% 100%",
                        background: `url(${this.state.backdrop}) repeat fixed`,
                        backgroundAttachment: "fixed"
                    }}>
                    <Row>
                        <Col sm="12" md={{ size: 6, offset: 3 }}>
                            <br/>
                            <Jumbotron classname="repContainer">
                                <Container>
                                    <Row>
                                        <Col>
                                            <h1>{role.title + ' ' + this.state.member.first_name + ' ' + this.state.member.last_name}</h1>
                                            <hr/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col>
                                            <div>
                                                <img src={this.state.portrait} alt="X"
                                                    style={{
                                                        borderColor: this.state.borderColor,
                                                        borderWidth: "10px",
                                                        borderStyle: "solid",
                                                        borderRadius: "10px"
                                                    }}/>
                                            </div>
                                        </Col>
                                        <Col>
                                            <h5>DOB: {this.state.member.date_of_birth}</h5>
                                            <h5>Party: {this.state.member.current_party}</h5>
                                            <h5>Chamber: {role.chamber}</h5>
                                            <br/>
                                            <h6>P: {role.phone}</h6>
                                            <h6>A: {role.office}</h6>
                                        </Col>
                                        <Col>
                                            <h3>Social Media</h3>
                                            <hr/>
                                            {this.state.member.url ? 
                                                <a href={this.state.member.url}>Official Government Site</a> :
                                                ''}
                                            <br/>
                                            {this.state.member.facebook_account ? 
                                                <a href={'https://www.facebook.com/' + this.state.member.facebook_account}>Facebook</a> :
                                                ''}
                                            <br/>
                                            {this.state.member.twitter_account ? 
                                                <a href={'https://www.twitter.com/' + this.state.member.twitter_account}>Twitter</a> :
                                                ''}
                                            <br/>
                                            {this.state.member.youtube_account ? 
                                                <a href={'https://www.youtube.com/user/' + this.state.member.youtube_account}>YouTube</a> :
                                                ''}
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col>
                                            <h4>Committees</h4>
                                            <hr/>
                                            <ul>
                                            {role.committees ? role.committees.map(com => (
                                                <li>{com.name}</li>
                                            )) : ''}
                                            </ul>
                                        </Col>
                                        <Col>
                                            <h4>Subcommittees</h4>
                                            <hr/>
                                            <ul>
                                            {role.subcommittees ? role.subcommittees.map(com => (
                                                <li>{com.name}</li>
                                            )) : ''}
                                            </ul>
                                        </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                    <Col>
                                        <h2>Bills</h2>
                                        <br/>
                                        <h5>Sponsored Bills: {role.bills_sponsored}</h5>
                                        <h5>Cosponsored Bills: {role.bills_cosponsored}</h5>
                                    </Col>
                                    </Row>
                                    <hr/>
                                    <Row>
                                        <Col>
                                            <h2>Voting Record</h2>
                                            <br/>
                                            <h5>Missed Vote Percentage: {role.missed_votes_pct + '%'}</h5>
                                            <h5>Votes with Party Percentage: {role.votes_with_party_pct + '%'}</h5>
                                            <br/>
                                            <h3>Recent Votes</h3>
                                        </Col>
                                    </Row>
                                    {this.state.votes.map(vote => (
                                        <Vote
                                            vote={vote}/>
                                    ))}
                                </Container>
                            </Jumbotron>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        district: state.district,
        state: state.state,
        pak: state.pak
    }
}

export default connect(mapStateToProps)(Representative);