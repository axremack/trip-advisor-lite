import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';

export class UserCardDetailed extends Component {
    static displayName = UserCardDetailed.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col className="h3 pt-5 font-weight-bold">Nom User</Col>
                </Row>
                <Row>
                    <Col className="h4 pl-3">Ville</Col>
                </Row>
            </Container>
        );
    }
}