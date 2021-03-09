import React, { Component } from 'react';
import {
	Collapse,
	Container,
	Navbar,
	NavbarBrand,
	NavbarToggler,
	NavItem,
	NavLink,
	DropdownToggle,
	DropdownMenu,
	DropdownItem,
	UncontrolledDropdown
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { SearchBar } from './SearchBar';
import './NavMenu.css';

export class NavMenu extends Component {
	static displayName = NavMenu.name;

	constructor(props) {
		super(props);

		this.toggleNavbar = this.toggleNavbar.bind(this);
		this.state = {
			collapsed: true,
			token: props.token,
			setToken: props.setToken
		};
	}

	toggleNavbar() {
		this.setState({
			collapsed: !this.state.collapsed
		});
	}

	static getDerivedStateFromProps(props, state) {
		if (props.token !== state.token) {
			return {
				token: props.token,
				setToken: props.setToken
			};
		}

		return null;
	}

	render() {
		const isLoggedIn = this.state.token;
		let button = null;

		if (isLoggedIn) {
			button = <UncontrolledDropdown nav inNavbar>
				<DropdownToggle nav caret>
					Mon compte
				</DropdownToggle>
				<DropdownMenu right>
					<DropdownItem>
						<NavLink tag={Link} className="text-dark p-0" to={"/user/" + this.state.token}>Profil</NavLink>
					</DropdownItem>
					<DropdownItem onClick={() => {
						localStorage.clear();
						this.state.setToken(null);
					}}>
						Deconnexion
                    </DropdownItem>
				</DropdownMenu>
			</UncontrolledDropdown>;
		} else {
			button = <NavItem>
				<NavLink tag={Link} className="text-dark" to="/login">Connexion</NavLink>
			</NavItem>;
		}

		return (
			<header style={{ position: "sticky", top: "0px", zIndex: 9000, backgroundColor: "white" }}>
				<Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
					<Container>
						<NavbarBrand tag={Link} to="/" className="font-weight-bold">
							<img
								src="/logo.png"
								width="35"
								height="35"
								className="d-inline-block align-middle mr-2"
								alt="TripAdvisor logo"
							/>
							Trip Advisor Lite
						</NavbarBrand>

						<NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
						<Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
							<SearchBar />
							<div className="navbar-nav flex-grow mr-5">
								{button}
							</div>
						</Collapse>
					</Container>
				</Navbar>
			</header>
		);
	}
}
