import React, { Component } from 'react';
import {
	Form,
	Col,
	FormGroup,
	Input,
	Button
} from 'reactstrap';

export class PlaceForm extends Component {
	static displayName = PlaceForm.name;

	render() {
		return (
			<Form>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="name" id="exampleName" placeholder="Nom" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="textarea" name="description" id="exampleDescritpion" placeholder="Description" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="city" id="exampleCity" placeholder="Ville" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="placetype" id="examplePlaceType" placeholder="Type" />
					</FormGroup>
				</Col>
				<Col md={6}>
					<FormGroup>
						<Input type="text" name="tag" id="exampleTag" placeholder="Tag" />
					</FormGroup>
				</Col>
				<div>
					<Button color="success">Valider</Button>{' '}
				</div>
			</Form>
		);
	}
}