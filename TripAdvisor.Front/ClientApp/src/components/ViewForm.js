import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';

export class ViewForm extends Component {
	static displayName = ViewForm.name;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Form>
				<Col md={6}>
					<FormGroup>
						<Input
							type="number"
							name="Note"
							id="exampleNote"
							placeholder="Note"
						/>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="textarea" name="commentaire" id="exampleCommentaire" placeholder="Commentaire" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="titre" id="exampleTitre" placeholder="Titre" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="date" name="date" id="exampleDate" placeholder="Date de visite" />
					</FormGroup>
				</Col>
				<div>
					<Button color="success">Valider</Button>{' '}
				</div>
			</Form>
		);
	}
}