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
    }//col md=4 classname=mr-4: on choisit de prendre pour cette colonne: 4 emplacements sur 12 de l'écran de taille médium, et on met une marge sur sa droite. Ainsi les autres colonnes restantes se partagent automatiquement les 8 colonnes restantes.
}