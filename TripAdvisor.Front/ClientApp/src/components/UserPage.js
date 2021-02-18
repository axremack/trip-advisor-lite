import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import { UserCommentCard } from "./UserCommentCard"
import { UserCardDetailed } from "./UserCardDetailed"


export class UserPage extends Component {
    static displayName = UserPage.name;

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container fluid className="pt-5">
                <Row>
                    <Col md="4" className="mr-4">
                        <UserCardDetailed />
                    </Col>
                    <Col className="mt-5">
                        <UserCommentCard />
                    </Col>
                </Row>
            </Container>
        );
    }
}