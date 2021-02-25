import React, { Component } from 'react';
import { Alert, Form, Button, FormGroup, FormFeedback, Label, Input, NavLink } from 'reactstrap';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import { sha256 } from 'js-sha256';

export class Login extends Component {
	static displayName = Login.name;

	constructor(props) {
		super(props);

		this.state = {
			doRedirect: false,
			setToken: props.setToken
		};
	}

	onSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		let form = document.getElementById("validation");

		if (form.checkValidity() === true) {
			let data = JSON.stringify({
				MailAddress: document.getElementById("mailInput").value,
				Password: sha256(document.getElementById("passwordInput").value)
			});

			const res = await fetch('owners/connect', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: data
			});

			if (res.status === 200) {
				let token = await res.text();
				localStorage.setItem('user', token);
				this.state.setToken(token);
				this.setState({ doRedirect: true });
			} else if (res.status === 401) {
				document.getElementById("incorrect").removeAttribute('hidden');
				document.getElementById("failed").setAttribute('hidden', 'true');
			} else {
				document.getElementById("incorrect").setAttribute('hidden', 'true');
				document.getElementById("failed").removeAttribute('hidden');
			}
		}

		form.classList.add('was-validated');
	}

	render() {
		if (this.state.doRedirect) {
			return <Redirect push to="/" />
		}

		return (
			<div>
				<h1>Connexion</h1>

				{this.props.location.search === '?new' ? <Alert id="newAccount" color='success'>
					<b>Bienvenue</b> Votre compte vient d'être créé. Connectez-vous sans plus attendre !
				</Alert> : null}
				

				<Alert id="incorrect" color='danger' hidden>
					<b>Identifiants incorrects</b> Vérifiez l'adresse mail et/ou le mot de passe.
				</Alert>

				<Alert id="failed" color='danger' hidden>
					<b>Erreur</b> La connexion a échoué. Veuillez réessayez.
				</Alert>

				<Form id="validation" noValidate onSubmit={this.onSubmit}>
					<FormGroup>
						<Label for="mailInput">Email</Label>
						<Input type="email" name="email" id="mailInput" placeholder="example@trpadvlite.com" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un mail valide (max. 255 caractères)</FormFeedback>
					</FormGroup>
					<FormGroup>
						<Label for="passwordInput">Mot de passe</Label>
						<Input type="password" name="password" id="passwordInput" required />
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