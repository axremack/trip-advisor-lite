import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'reactstrap';

export class CommentCard extends Component {
	static displayName = CommentCard.name;

	render() {
		return (
			<Container fluid className="border">
				<Row className="pt-2">
					<Col className="h4 font-weight-bold">Titre avis</Col>
					<Col className="h4 text-right">Nom auteur</Col>
				</Row>
				<Row className="pb-1">
					<Col className="h5">Note</Col>
				</Row>
				<Row className="pb-2">
					<Col>Avis BLALBALBLLBLABLALLBALBLAL</Col>
				</Row>
				<Row className="pb-2">
					<Col>Date de visite :</Col>
				</Row>
			</Container>
		);
	}
}
