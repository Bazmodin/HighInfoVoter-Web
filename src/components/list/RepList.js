import React from "react";
import { ListGroup, ListGroupItem } from 'reactstrap';

class RepList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            
        }
    }

    render() {
        console.log(this.props);
        return (
            <div>
                <h1>Your Senators</h1>
                <ListGroup>
                    
                </ListGroup>
            </div>
        );
    }
}

export default RepList;