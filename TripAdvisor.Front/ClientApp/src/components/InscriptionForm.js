import React, { Component } from 'react';
import {
	Form,
	Col,
	FormGroup,
	Input,
	Button
} from 'reactstrap';

export class InscriptionForm extends Component {
	static displayName = InscriptionForm.name;

	constructor(props) {
		super(props);
	}

	render() {
		return (
			<Form>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="username" id="exampleUserName" placeholder="Nom utilisateur" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="password" name="password" id="examplePassword" placeholder="Mot de passe" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="city" id="exampleCity" placeholder="Ville" />
					</FormGroup>
				</Col>
				<div>
					<Button color="success">S'inscrire</Button>{' '}
				</div>
			</Form>
		);
	}
}