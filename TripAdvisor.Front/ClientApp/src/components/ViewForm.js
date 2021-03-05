import React, { Component } from 'react';
import {
	Form,
	Col,
	FormGroup,
	Input,
	Button,
	FormFeedback
} from 'reactstrap';
import { Redirect } from 'react-router';


export class ViewForm extends Component {
	static displayName = ViewForm.name;

	constructor(props) {
		super(props);

		this.state = {
			doRedirect: false
		};
	}

	onSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		let form = document.getElementById("validation");

		if (form.checkValidity() === true) {
			let data = JSON.stringify({
				UserId: this.props.userId,
				PlaceId: this.props.match.params.id,
				Rank: document.getElementById("noteInput").value,
				Content: document.getElementById("commentInput").value,
				Title: document.getElementById("titleInput").value,
				Date: document.getElementById("dateInput").value
			});

			const res = await fetch('comments', {
				method: 'POST',
				headers: { 'Content-type': 'application/json' },
				body: data
			});

			if (res.status === 201) {
				this.setState({ doRedirect: true });
			}
		}
		form.classList.add('was-validated');
	}


	render() {
		if (this.state.doRedirect) {
			return <Redirect push to={"/place/" + this.props.match.params.id}  with="Votre avis a été créé"/>
		}

		return (
			<Form id="validation" noValidate onSubmit={this.onSubmit}>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="title" id="titleInput" placeholder="Titre" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un titre (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="textarea" name="comment" id="commentInput" placeholder="Commentaire" required maxLength="2000" />
						<FormFeedback invalid="true">Entrez un commentaire (max. 2000 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input
							type="number"
							name="Note"
							id="noteInput"
							placeholder="Note"
							min={1}
							max={5}
							required
						/>
						<FormFeedback invalid="true">Entrez une note entre 1 et 5</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="date" name="date" id="dateInput" placeholder="Date de visite" required />
						<FormFeedback invalid="true">Entrez une date de visite </FormFeedback>
					</FormGroup>
				</Col>
				<div>
					<Button color="success">Valider</Button>
				</div>
			</Form>
		);
	}
}