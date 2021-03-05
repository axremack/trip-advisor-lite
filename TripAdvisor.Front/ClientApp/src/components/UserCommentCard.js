import React, { Component } from 'react';
import {
	Container,
	Row,
	Col
} from 'reactstrap';
import './CommentCard.css';

export class UserCommentCard extends Component {
	static displayName = UserCommentCard.name;

	constructor(props) {
		super(props);
		this.state = {
			Place: [],
		};
	}

	componentDidMount() {
		this.findPlace();
	}

	async findPlace() {
		const res = await fetch('places/' + this.props.place, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});

		if (res.ok) {
			res.json().then(data => this.setState({ Place: data }));
		} else {
			this.setState({ Place: null });
		}
	}

	render() {
		return (
			<Container fluid className="border mb-2">
				<Row className="pt-2">
					<Col className="h4 font-weight-bold">{ this.state.Place.title }, { this.state.Place.city }</Col>
				</Row>
				<Row className="pb-1">
					<Col className="h5 font-weight-bold">{this.props.title}</Col>
					<Col className="h5 text-right">{this.props.rank}/5
						<div className="stars-outer">
							&#x02606;&#x02606;&#x02606;&#x02606;&#x02606;
							<div className="stars-inner" style={{ width: this.props.rank / 5 * 100 + '%' }}>
								&#x02605;&#x02605;&#x02605;&#x02605;&#x02605;
							</div>
						</div>
					</Col>
				</Row>
				<Row className="pb-2">
					<Col>{this.props.content}</Col>
				</Row>
				<Row className="pb-2">
					<Col>Date de visite : {new Date(this.props.date).toLocaleDateString()}</Col>
				</Row>
			</Container>
		);
	}
}