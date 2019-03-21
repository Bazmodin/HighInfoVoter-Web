import React from 'react';
import { ListGroupItem, Media } from 'reactstrap';


class RepListCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    render() {
        console.log(this.props.rep);
        return (
            <ListGroupItem>
                <Media>
                    <Media left href="#">
                    <Media object src="https://prd-wret.s3-us-west-2.amazonaws.com/assets/palladium/production/s3fs-public/styles/full_width/public/thumbnails/image/placeholder-profile_0.png" alt="RepAvatar"
                        style={{
                            maxWidth: "100px",
                            maxHeight: "100px"
                        }}/>
                    </Media>
                    <Media body
                        style={{
                            padding: "20px"
                        }}>
                        <Media heading>
                            {this.props.rep.role} {this.props.rep.name}
                        </Media>
                        Party: {this.props.rep.party}
                        <br/>
                        Next Election: {this.props.rep.next_election}
                    </Media>
                </Media>
            </ListGroupItem>
        );
    }
}

export default RepListCard;