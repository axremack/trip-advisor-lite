import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'reactstrap';

export class UserCommentCard extends Component {
	static displayName = UserCommentCard.name;

	render() {
		return (
			<Container fluid className="border">
				<Row className="pt-1">
					<Col className="h4 font-weight-bold">Lieu</Col>
				</Row>
				<Row>
					<Col className="h5 font-weight-bold">Titre avis récent</Col>
					<Col className="h5 text-right">Nom auteur</Col>
				</Row>
				<Row>
					<Col>Les bords de l'Allier ......... blablablabla</Col>
				</Row>
			</Container>
		);
	}
}