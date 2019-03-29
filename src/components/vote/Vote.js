import React from 'react';
import { Card, CardText, CardBody, CardTitle, CardSubtitle, Row } from 'reactstrap';

class Vote extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const { vote } = this.props;
        var title = '';
        if (vote.bill.title) {
            title = ', ' + vote.bill.title
        }
        return (
            <Row>
                <Card
                    style={{
                        width: "100%",
                        overflow: "auto"
                    }}>
                    <CardBody>
                        <CardTitle><h4>Bill: {vote.bill.number + title}</h4></CardTitle>
                        <CardSubtitle>Vote: {vote.position} | Date: {vote.date}</CardSubtitle>
                        <CardText>
                            <h5>Question:</h5> {vote.question}
                            <h5>Description:</h5> {vote.description}
                            <h5>Result:</h5> {vote.result}
                            <h5>Vote totals:</h5>
                            Ayes: {vote.total.yes} | Nays: {vote.total.no} | Present: {vote.total.present} | Not Voting: {vote.total.not_voting}
                        </CardText>
                    </CardBody>
                </Card>
            </Row>
        )
    }
}

export default Vote;