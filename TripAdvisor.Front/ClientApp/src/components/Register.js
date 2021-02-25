import React, { Component } from 'react';
import { FormFeedback, Form, Button, FormGroup, Label, Input, NavLink, Alert } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';

export class Register extends Component {
	static displayName = Register.name;

	constructor(props) {
		super(props);

		this.state = {
			doRedirect: false
		};
	}

	validatePassword = () => {
		if (document.getElementById("passwordInput").value !== document.getElementById("confirmPasswordInput").value) {
			document.getElementById("confirmPasswordInput").setCustomValidity("no match");
		} else {
			document.getElementById("confirmPasswordInput").setCustomValidity("");
		}
	}

	onSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		let form = document.getElementById("validation");

		if (form.checkValidity() === true) {
			let data = JSON.stringify({
				SurName: document.getElementById("surnameInput").value,
				FirstName: document.getElementById("firstNameInput").value,
				MailAddress: document.getElementById("mailInput").value,
				Password: sha256(document.getElementById("passwordInput").value)
			});
			
			const res = await fetch('owners', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: data
			});

			if (res.status === 201) {
				this.setState({ doRedirect: true });
			} else if (res.status === 409) {
				document.getElementById("mailUsed").removeAttribute('hidden');
				document.getElementById("failed").setAttribute('hidden', 'true');
			} else {
				document.getElementById("mailUsed").setAttribute('hidden', 'true');
				document.getElementById("failed").removeAttribute('hidden');
			}
		}

		form.classList.add('was-validated');
	}

	render() {
		if (this.state.doRedirect) {
			return <Redirect push to="/login?new"/>
		}

		return (
			<div>
				<h1>S'inscrire</h1>

				<Alert id="mailUsed" color='danger' hidden>
					<b>Adresse mail déjà utilisée</b> Veuillez entrer une autre adresse.
				</Alert>

				<Alert id="failed" color='danger' hidden>
					<b>Erreur</b> L'inscription a échoué. Veuillez réessayez.
				</Alert>

				<Form id="validation" noValidate onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="mailInput">Nom</Label>
						<Input type="text" name="surname" id="surnameInput" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un nom (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="mailInput">Prénom</Label>
						<Input type="text" name="firstName" id="firstNameInput" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un prénom (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="mailInput">Email</Label>
						<Input type="email" name="email" id="mailInput" placeholder="example@trpadvlite.com" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un mail valide (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Mot de passe</Label>
						<Input type="password" name="password" id="passwordInput" required minLength="8" onChange={this.validatePassword} />
						<FormFeedback invalid="true">Entrez un mot de passe avec au moins 8 caractères</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Confirmer le mot de passe</Label>
						<Input type="password" id="confirmPasswordInput" onChange={this.validatePassword} />
						<FormFeedback invalid="true">Mots de passe différents</FormFeedback>
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