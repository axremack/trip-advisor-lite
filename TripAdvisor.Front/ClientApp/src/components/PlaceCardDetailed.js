import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'reactstrap';
import { Link } from 'react-router-dom';

export class PlaceCardDetailed extends Component {
	static displayName = PlaceCardDetailed.name;

	render() {
		return (
			<Container fluid>
				<Row>
					<Col className="h3 p-0 font-weight-bold">{this.props.title}</Col>
				</Row>
				<Row>
					<Col className="h3 p-0">{this.props.city}</Col>
				</Row>
				<Row>
					<Col className="h5 px-0 pb-3">Note moyenne (nombre d'avis)</Col>
				</Row>
				<Row className="pb-3">
					<img width="100%" src="/img_bidon.jpg" alt="A beautiful place" />
				</Row>
				<Row>
					<Button tag={Link} to={"/place/" + this.props.id + "/addcomment"} color="success">Ajouter un avis</Button>
				</Row>
			</Container>
		);
	}
}
