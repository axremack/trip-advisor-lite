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
		const res = await fetch('comments', {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});

		if (res.ok) {
			res.json().then(data => this.setState({ Comments: data }));
		} else {
			this.setState({ Places: null });
		}
	}

	AvgRank(comments) {
		var total = comments.length;
		var avg = 0;
		console.log(avg);
		console.log(total);
		comments.map(comment => { avg += comment.rank; });
		return avg / total;
    }

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
					<Col className="h5 px-0 pb-3">{this.AvgRank(this.state.Comments)} ({this.state.Comments.length} avis)</Col>
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
