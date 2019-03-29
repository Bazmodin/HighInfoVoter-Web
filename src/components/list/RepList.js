import React from "react";
import { ListGroup } from 'reactstrap';
import { connect } from 'react-redux';
import RepListCard from './RepListCard';
import ProPublicaApiService from '../../services/ProPublicaApiService';
import '../../App.css';

class RepList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            senators: [],
            congressperson: {}
        }
    }

    componentDidMount() {
        ProPublicaApiService.getSenators(this.props.state, this.props.pak, this.onGetSenatorsSuccess, this.onError);
        ProPublicaApiService.getCongressperson(this.props.state, this.props.district, this.props.pak, this.onGetCongresspersonSuccess, this.onError);
    }

    onGetSenatorsSuccess = resp => {
        resp.data.results.forEach(senator => {
            this.setState({
                senators: [...this.state.senators, senator]
            });
        });
    }

    onGetCongresspersonSuccess = resp => {
        console.log("HomePage.onGetCongresspersonSuccess", resp)
        this.setState({
            congressperson: resp.data.results[0]
        })
    }

    onError = err => {
        console.error(err)
    }

    render() {
        return (
            <div>
                <h1 className="landing-page-header landing-page-text">Your Representatives</h1>
                <ListGroup>
                    {this.state.senators.map(senator => (
                        <RepListCard
                            key={senator.id}
                            rep={senator}/>
                    ))}
                    <RepListCard
                        key={this.state.congressperson.id}
                        rep={this.state.congressperson}
                        congressperson={true}/>
                </ListGroup>
            </div>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        district: state.district,
        state: state.state,
        pak: state.pak
    }
}

export default connect(mapStateToProps)(RepList);