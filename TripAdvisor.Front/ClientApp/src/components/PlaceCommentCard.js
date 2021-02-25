import React, { Component } from 'react';
import {
    Container, 
    Row, 
    Col,
    Button
} from 'reactstrap';

export class PlaceCommentCard extends Component {
    static displayName = PlaceCommentCard.name;

    constructor (props) {
        super(props);
        /*this.state = {
            User: null,
        };*/
    }

    /*async findUserComment() {
        const res = await fetch('user', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        console.log(res);

        if (res.ok) {
            res.json().then(data => this.setState({ Comments: data }));
        } else {
            this.setState({ Comments: null });
        }
    }*/

 render() {
     return (
        <Container fluid className="border mb-2">
            <Row className="pt-2">
                 <Col className="h4 font-weight-bold">{this.props.title}</Col>
                 <Col className="h4 text-right">{this.props.user}</Col>
            </Row> 
            <Row className="pb-1">
                 <Col className="h5">{this.props.rank}/5</Col>
            </Row> 
            <Row className="pb-2">
                 <Col>{this.props.content}</Col>
            </Row> 
            <Row className="pb-2">
                 <Col>Date de visite : {this.props.date}</Col> 
            </Row>
        </Container>
    );
  }
}
