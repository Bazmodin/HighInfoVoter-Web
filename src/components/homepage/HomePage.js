import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { connect } from 'react-redux';
import SiteNavBar from '../navbar/SiteNavBar';
import RepList from '../list/RepList';
import AwsS3Service from '../../services/AwsS3Service';
import '../../App.css';

class HomePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backdrop: ''
        };
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
                        <Col
                            style={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                            <RepList/>
                        </Col>
                    </Row>
                </Container>
            </div>
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