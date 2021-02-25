import React, { Component } from 'react';
import {
	Form,
	Col,
	FormGroup,
	Input,
	Button,
	FormFeedback
} from 'reactstrap';

export class PlaceForm extends Component {
	static displayName = PlaceForm.name;

	constructor(props) {
		super(props);

		this.state = {
			doRedirect: false
		};
	}

	onSubmit = async (event) => {
		event.preventDefault();
		event.stopPropagation();
		let form = document.getElementById("valid");

		if (form.checkValidity() === true) {
			let data = JSON.stringify({
				Name: document.getElementById("NameInput").value,
				Description: document.getElementById("DescritpionInput").value,
				City: document.getElementById("CityInput").value,
				PlaceType: document.getElementById("PlaceTypeInput").value,
				Tag: document.getElementById("TagInput").value
			});

			const res = await fetch('places', {
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
		return (
			<Form id="valid" noValidate onSubmit={this.onSubmit}>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="name" id="NameInput" placeholder="Nom" required maxlength="255"/>
						<FormFeedback invalid="true">Entrez un nom (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="textarea" name="description" id="DescritpionInput" placeholder="Description" required maxlength="2000" />
						<FormFeedback invalid="true">Entrez une description (max. 2000 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="city" id="CityInput" placeholder="Ville" required maxlength="255" />
						<FormFeedback invalid="true">Entrez une ville (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="placetype" id="PlaceTypeInput" placeholder="Type" required maxlength="255" />
						<FormFeedback invalid="true">Entrez un type (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="tag" id="TagInput" placeholder="Tag" required maxlength="255" />
						<FormFeedback invalid="true">Entrez un tag (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<div>
					<Button color="success">Valider</Button>{' '}
				</div>
			</Form>
		);
	}
}