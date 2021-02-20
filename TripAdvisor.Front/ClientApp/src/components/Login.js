import React, { Component } from 'react';
import { Alert, Form, Button, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Login extends Component {
	static displayName = Login.name;

	render() {
		return (
			<div>
				<h1>Connexion</h1>

				<Alert color='danger' hidden>
					Les identifiants sont incorects
				</Alert>

				<Form>
					<FormGroup>
						<Label for="mailInput">Email</Label>
						<Input type="email" name="email" id="mailInput" placeholder="example@trip.advisor.com" />
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Mot de passe</Label>
						<Input type="password" name="password" id="passwordInput" />
					</FormGroup>
					<div className="d-flex">
						<Button color='success'>C'est parti !</Button>
						<NavLink tag={Link} className="btn btn-secondary ml-2" to="/register">Pas de compte ? Créez-en un !</NavLink>
					</div>
				</Form>

			</div>
		);
	}
}