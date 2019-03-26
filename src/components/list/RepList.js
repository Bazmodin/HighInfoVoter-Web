import React from "react";
import { ListGroup } from 'reactstrap';
import RepListCard from './RepListCard';

class RepList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        return (
            <div>
                <h1 align="center">Your Senators</h1>
                <ListGroup>
                    {this.props.senators.map(senator => (
                        <RepListCard
                            key={senator.id}
                            rep={senator}
                            state={this.props.state}/>
                    ))}
                </ListGroup>
                <h1 align="center">Your Congressperson</h1>
                <ListGroup>
                    <RepListCard
                        rep={this.props.congressperson}
                        district={this.props.state + '-' + this.props.district}/>
                </ListGroup>
            </div>
        );
    }
}

export default RepList;