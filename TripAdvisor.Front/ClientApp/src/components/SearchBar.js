import React, { Component } from 'react';
import {
	Form,
	Button,
	Input,
	InputGroup,
	InputGroupAddon
} from 'reactstrap';

export class SearchBar extends Component {
	static displayName = SearchBar.name;

	render() {
		return (
			<Form inline className="ml-5">
				<InputGroup>
					<Input type="search" placeholder="Rechercher un lieu"/>
					<InputGroupAddon addonType="append">
						<Button variant="outline-success" type="submit">Rechercher</Button>{' '}
					</InputGroupAddon>
				</InputGroup>
			</Form>
		);
	}
}
