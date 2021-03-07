import React, { Component } from 'react';
import {
	Form,
	Label,
	FormGroup,
	Input,
	Button,
	FormFeedback
} from 'reactstrap';
import { Redirect } from 'react-router';
import ReactTags from 'react-tag-autocomplete';

import '../custom.css';

export class PlaceForm extends Component {
	static displayName = PlaceForm.name;

	constructor(props) {
		super(props);

		this.state = {
			doRedirect: false,
			tags: [],
			suggestions: []
		};

		this.reactTags = React.createRef();
	}

	async TagsList() {
		const res = await fetch('tags', {
			method: 'GET',
			headers: { 'Content-type': 'application/json' }
		});

		if (res.ok) {
			res.json().then(data => {
				this.setState({ suggestions: data.map(d => { return { id: d.tagId, name: d.type } }) });
			});
		} else {
			this.setState({ tags: null });
		}
	}

	componentDidMount() {
		this.TagsList();
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

	onDelete(i) {
		const tags = this.state.tags.slice(0)
		tags.splice(i, 1)
		this.setState({ tags })
	}

	onAddition(tag) {
		const tags = [].concat(this.state.tags, tag)
		this.setState({ tags })
	}

	render() {
		if (this.state.doRedirect) {
			return <Redirect push to={"/user/" + this.props.userId } with="Votre lieu a été ajouté" />
		}

		return (
			<Form id="valid" noValidate onSubmit={this.onSubmit} style={{ marginBottom: '2em' }}>
				<FormGroup>
					<Label for="TitleInput">Nom du lieu</Label>
					<Input type="text" name="title" id="TitleInput" required maxLength="255"/>
					<FormFeedback invalid="true">Entrez un titre (max. 255 caractères)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="DescritpionInput">Description</Label>
					<Input type="textarea" name="description" id="DescritpionInput" placeholder="Entrez ici ce qui fait le charme du lieu" required maxLength="2000" />
					<FormFeedback invalid="true">Entrez une description (max. 2000 caractères)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="BedRoomCountInput">Nombre de chambres</Label>
					<Input type="number" name="BedRoomCount" id="BedRoomCountInput" min={0} max={10000} required />
					<FormFeedback invalid="true">Entrez le nombre de chambres (maximum 10 000)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="BathRoomCountInput">Nombre de salles de bain</Label>
					<Input type="number" name="BathRoomCount" id="BathRoomCountInput" min={0} max={10} required />
					<FormFeedback invalid="true">Entrez le nombre de salles de bain (maximum 10)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="StreetInput">Rue</Label>
					<Input type="text" name="street" id="StreetInput" required maxLength="255" />
					<FormFeedback invalid="true">Entrez une rue (max. 255 caractères)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="CityInput">Ville</Label>
					<Input type="text" name="street" id="CityInput" required maxLength="255" />
					<FormFeedback invalid="true">Entrez une ville (max. 255 caractères)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="ZipCodeInput">Code postal</Label>
					<Input type="number" name="zipcode" id="ZipCodeInput" required />
					<FormFeedback invalid="true">Entrez un code postal</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="StateInput">Pays</Label>
					<Input type="text" name="state" id="StateInput" required maxLength="255" />
					<FormFeedback invalid="true">Entrez un pays (max. 255 caractères)</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="PriceInput">Prix</Label>
					<Input type="number" name="price" id="PriceInput" required/>
					<FormFeedback invalid="true">Entrez un prix</FormFeedback>
				</FormGroup>
				<FormGroup>
					<Label for="TagInput">Tags</Label>
					<ReactTags
						id="TagInput"
						ref={this.reactTags}
						tags={this.state.tags}
						suggestions={this.state.suggestions}
						placeholderText=""
						removeButtonText="Cliquer pour enlever ce tag"
						noSuggestionsText="Aucune suggestion"
						onDelete={this.onDelete.bind(this)}
						onAddition={this.onAddition.bind(this)}/>
				</FormGroup>
				<div>
					<Button color="success">Valider</Button>{' '}
				</div>
			</Form>
		);
	}
}
