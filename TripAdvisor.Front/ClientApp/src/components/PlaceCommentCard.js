import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'reactstrap';
import './PlaceCommentCard.css';

export class PlaceCommentCard extends Component {
	static displayName = PlaceCommentCard.name;

	constructor(props) {
		super(props);
		this.state = {
			User: [],
		};
	}

	componentDidMount() {
		this.findUser();
	}

	async findUser() {
		const res = await fetch('users/' + this.props.user, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});
		console.log(res);

		if (res.ok) {
			res.json().then(data => this.setState({ User: data }));
		} else {
			this.setState({ User: null });
		}
	}

	render() {
		return (
			<Container fluid className="border mb-2">
				<Row className="pt-2">
					<Col className="h4 font-weight-bold">{this.props.title}</Col>
					<Col className="h4 text-right">{this.state.User.surName}</Col>
				</Row>
				<Row className="pb-1">
					<Col className="h5">{this.props.rank}/5 
						<div className="stars-outer">
							&#x02606;&#x02606;&#x02606;&#x02606;&#x02606;
							<div className="stars-inner" style={{ width: this.props.rank / 5 * 100 + '%'}}>
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
