import React, { Component } from 'react';
import {
	Card,
	CardBody,
	CardTitle,
	CardImg,
	CardText,
	Col
} from 'reactstrap';
import { Link } from 'react-router-dom';


export class PlaceCard extends Component {
	static displayName = PlaceCard.name;

	render() {
		return (
			<Col sm="6">
				<Card>
					<CardImg top width="10%" src="/img_bidon.jpg" alt="Place Image" />
					<CardBody>
						<CardTitle tag="h5">{this.props.title + ", " + this.props.city}</CardTitle>
						<CardText tag={Link} to={"/place/" + this.props.id}>En savoir plus</CardText>
					</CardBody>
				</Card>
			</Col>
		);
	}
}
