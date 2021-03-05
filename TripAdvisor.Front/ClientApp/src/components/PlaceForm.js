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
				OwnerId: this.props.userId,
				Title: document.getElementById("TitleInput").value,
				Description: document.getElementById("DescritpionInput").value,
				BedRoomCount: document.getElementById("BedRoomCountInput").value,
				BathRoomCount: document.getElementById("BathRoomCountInput").value,
				Street: document.getElementById("StreetInput").value,
				City: document.getElementById("CityInput").value,
				ZipCode: document.getElementById("ZipCodeInput").value,
				State: document.getElementById("StateInput").value,
				Price: document.getElementById("PriceInput").value,
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
		if (this.state.doRedirect) {
			return <Redirect push to={"/user/" + this.props.userId } with="Votre lieu a été ajouté" />
		}

		return (
			<Form id="valid" noValidate onSubmit={this.onSubmit}>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="title" id="TitleInput" placeholder="Titre" required maxLength="255"/>
						<FormFeedback invalid="true">Entrez un titre (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="textarea" name="description" id="DescritpionInput" placeholder="Description" required maxLength="2000" />
						<FormFeedback invalid="true">Entrez une description (max. 2000 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="number" name="BedRoomCount" id="BedRoomCountInput" placeholder="Nombre de chambres" required maxLength="2000" />
						<FormFeedback invalid="true">Entrez le nombre de chambres (max. 2000 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="number" name="BathRoomCount" id="BathRoomCountInput" placeholder="Nombre de salles de bains" required maxLength="2000" />
						<FormFeedback invalid="true">Entrez le nombre de salles de bain (max. 2000 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="street" id="StreetInput" placeholder="Rue" required maxLength="255" />
						<FormFeedback invalid="true">Entrez une rue (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="street" id="CityInput" placeholder="Ville" required maxLength="255" />
						<FormFeedback invalid="true">Entrez une ville (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="zipcode" id="ZipCodeInput" placeholder="ZipCode" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un zip (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="state" id="StateInput" placeholder="Pays" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un pays (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="number" name="price" id="PriceInput" placeholder="Prix" required maxLength="255" />
						<FormFeedback invalid="true">Entrez un prix (max. 255 caractères)</FormFeedback>
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="number" name="tag" id="TagInput" placeholder="Tag" required maxLength="255" />
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
