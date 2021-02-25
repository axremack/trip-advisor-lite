import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { NavMenu } from './NavMenu';

export class Layout extends Component {
	static displayName = Layout.name;

	constructor(props) {
		super(props);

		this.state = {
			appState: props.appState,
			setToken: props.setToken
		};
	}

	componentWillReceiveProps(nextProps) {
		this.setState({ appState: nextProps.appState });
	}

	render() {
		return (
			<div>
				<NavMenu appState={this.state.appState} setToken={this.state.setToken} />
				<Container>
					{this.props.children}
				</Container>
			</div>
		);
	}
}
