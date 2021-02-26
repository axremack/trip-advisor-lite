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
		const res = await fetch('comments/place/' + this.props.id, {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});

		if (res.ok) {
			res.json().then(data => this.setState({ Comments: data }));
		} else {
			this.setState({ Comments: null });
		}
	}

	AvgRank(comments) {
		let total = comments.length;
		let avg = 0;
		comments.map(comment => avg += comment.rank);
		return avg / total;
    }

	render() {
		let numberComments = null;
		
		if ((this.state.Comments !== null) && (this.state.Comments.length !== 0)) {
			numberComments = "Note moyenne : " + this.AvgRank(this.state.Comments) + " (" + this.state.Comments.length + " avis)";
		}

		return (
			<Container fluid>
				<Row>
					<Col className="h3 p-0 font-weight-bold">{this.props.title}</Col>
				</Row>
				<Row>
					<Col className="h3 p-0">{this.props.city}</Col>
				</Row>
				<Row>
					<Col className="h5 px-0 pb-3">{numberComments}</Col>
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
