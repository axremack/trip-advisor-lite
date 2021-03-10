import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
	static displayName = Layout.name;

	constructor(props) {
		super(props);

		this.state = {
			token: props.token,
			setToken: props.setToken
		};
	}

	static getDerivedStateFromProps(props, state) {
		if (props.token !== state.token) {
			return {
				token: props.token
			};
		}

		return null;
	}

	render() {
		return (
			<div>
				<NavMenu token={this.state.token} setToken={this.state.setToken} />
				<Container>
					{this.props.children}
				</Container>
			</div>
		);
	}
}
