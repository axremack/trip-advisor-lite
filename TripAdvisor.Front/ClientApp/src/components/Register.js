import React, { Component } from 'react';
import { FormFeedback, Form, Button, FormGroup, Label, Input, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';

export class Register extends Component {
	static displayName = Register.name;

	validatePassword = () => {
		if (document.getElementById("passwordInput").value != document.getElementById("confirmPasswordInput").value) {
			document.getElementById("confirmPasswordInput").setCustomValidity("no match");
		} else {
			document.getElementById("confirmPasswordInput").setCustomValidity("");
		}
	}

	onSubmit = async (event) => {
		let form = document.getElementById("validation");
		console.log('sub');
		if (form.checkValidity() !== true) {
			event.preventDefault();
			event.stopPropagation();
		}

		form.classList.add('was-validated');
	}

	render() {
		return (
			<div ref={ d => (this.instance = d) }>
				<h1>S'inscrire</h1>

				<Form id="validation" noValidate onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="mailInput">Nom</Label>
						<Input type="text" name="surname" id="surnameInput" required maxLength="255"/>
						<FormFeedback invalid>Entrez un nom (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="mailInput">Prénom</Label>
						<Input type="text" name="firstName" id="firstNameInput" required maxLength="255"/>
						<FormFeedback invalid>Entrez un prénom (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="mailInput">Email</Label>
						<Input type="email" name="email" id="mailInput" placeholder="example@trip.advisor.com" required maxLength="255" onChange={this.handleMail}/>
						<FormFeedback invalid>Entrez un mail valide (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Mot de passe</Label>
						<Input type="password" name="password" id="passwordInput" required minLength="8" onChange={this.validatePassword}/>
						<FormFeedback invalid>Entrez un mot de passe avec au moins 8 caractères</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Confirmer le mot de passe</Label>
						<Input type="password" id="confirmPasswordInput" onChange={this.validatePassword}/>
						<FormFeedback invalid>Mots de passe différents</FormFeedback>
					</FormGroup>
					<div className="d-flex">
						<Button color='success'>C'est parti !</Button>
						<NavLink tag={Link} className="btn btn-secondary ml-2" to="/login">Déjà chez nous ? Connectez-vous !</NavLink>
					</div>
				</Form>
			</div>
		);
	}
}