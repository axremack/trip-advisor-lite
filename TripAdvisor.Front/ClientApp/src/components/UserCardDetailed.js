import React, { Component } from 'react';
import {
    Container,
    Row,
    Col,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';


export class UserCardDetailed extends Component {
    static displayName = UserCardDetailed.name;

    constructor(props) {
        super(props);
        this.state = {
            Comments: []
        };
    }

    componentDidMount() {
        this.populateCommentsList();
    }

    async populateCommentsList() {
        if (this.props.id) {
            const res = await fetch('comments/user/' + this.props.id, {
                method: 'GET',
                headers: { 'Content-type': 'application/json' }
            });

            if (res.ok) {
                res.json().then(data => this.setState({ Comments: data }));
            } else {
                this.setState({ Comments: null });
            }
        }
    }

    render() {
        const isLoggedIn = this.props.token;
        let button = null;
        let numberComments = null;

        if (Number(isLoggedIn) === this.props.id) {
            button = <Button tag={Link} to={"/user/" + this.props.id + "/addplace"} color="success">Ajouter un lieu</Button>;
        }

        if (this.state.Comments == null) {
            numberComments = <Col className="h4 p-0">0 avis écris</Col>;
        }
        else {
            numberComments = <Col className="h4 p-0">{this.state.Comments.length} avis écris</Col>;
        }

        return (
            <Container>
                <Row>
                    <Col className="h3 p-0 font-weight-bold">{this.props.firstname} {this.props.surname}</Col>
                </Row>
                <Row className="mb-5">
                    {numberComments}
                </Row>
                <Row>
                    {button}
                </Row>
            </Container>
        );
    }
}