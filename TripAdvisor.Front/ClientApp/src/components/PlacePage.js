import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'reactstrap';
import { CommentCard } from './CommentCard';
import { PlaceCardDetailed } from './PlaceCardDetailed';
import { SortMenu } from './SortMenu';


export class PlacePage extends Component {
	static displayName = PlacePage.name;

	render() {
		return (
			<Container fluid className="pt-5">
				<Row>
					<Col md="4" className="mr-4">
						<PlaceCardDetailed />
					</Col>
					<Col className="mt-5">
						<SortMenu />
						<CommentCard />
					</Col>
				</Row>
			</Container>
		);
	}
}
