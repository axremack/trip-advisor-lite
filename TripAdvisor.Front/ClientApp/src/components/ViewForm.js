import React, { Component } from 'react';
import {
	Form,
	Col,
	FormGroup,
	Input,
	Button
} from 'reactstrap';

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
							min="1"
							max="5"
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