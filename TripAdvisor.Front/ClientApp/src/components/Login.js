import React, { Component } from 'react';
import { Alert, Form, Button, FormGroup, Label, Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap';

export class Login extends Component {
	static displayName = Login.name;

	render() {
		return (
			<div>
				<h1>Connexion</h1>

				<Alert color='danger'>
					Les identifiants sont incorects
				</Alert>

				<Form>
					<FormGroup>
						<Label for="mailInput">Email</Label>
						<InputGroup>
							<InputGroupAddon addonType='prepend'>
								<InputGroupText>@</InputGroupText>
							</InputGroupAddon>
							<Input type="email" name="email" id="mailInput" placeholder="example@trip.advisor.com"/>
						</InputGroup>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Mot de passe</Label>
						<Input type="password" name="password" id="passwordInput"/>
					</FormGroup>
					<Button color='success'>C'est parti !</Button>
				</Form>

			</div>
		);
	}
}