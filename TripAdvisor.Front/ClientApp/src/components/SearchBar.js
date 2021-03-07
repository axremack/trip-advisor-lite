import React, { Component } from 'react';
import {
	Form,
	Button,
	Input,
	InputGroup,
	InputGroupAddon
} from 'reactstrap';
import { Link } from 'react-router-dom';

export class SearchBar extends Component {
	static displayName = SearchBar.name;

	constructor() {
		super();
		this.state = {
			Text: ''
		}

		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.setState({ Text: event.target.value });
	}

	render() {
		return (
			<Form inline>
				<InputGroup>
					<Input type="search" placeholder="Rechercher un lieu" value={this.state.Text} onChange={this.handleChange}/>
					<InputGroupAddon addonType="append">
						<Button variant="outline-success" type="submit" tag={Link} to={"/search/" + this.state.Text}>Rechercher</Button>{' '}
					</InputGroupAddon>
				</InputGroup>
			</Form>
		);
	}
}
