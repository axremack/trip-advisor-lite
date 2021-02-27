import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	UncontrolledDropdown,
	DropdownToggle,
	DropdownMenu,
	DropdownItem
} from 'reactstrap';


export class SortMenu extends Component {
	static displayName = SortMenu.name;

	render() {
		return (
			<Container className="text-right">
				<Row>
					<Col className="px-0 pb-2">
						<UncontrolledDropdown>
							<DropdownToggle caret>
								Trier par ...
							</DropdownToggle>
							<DropdownMenu>
								<DropdownItem onClick={ () => this.props.setSort(null) }>Plus recent</DropdownItem>
								<DropdownItem onClick={ () => this.props.setSort('old') }>Plus ancien</DropdownItem>
								<DropdownItem onClick={ () => this.props.setSort('min-rank') }>Note min</DropdownItem>
								<DropdownItem onClick={ () => this.props.setSort('max-rank') }>Note max</DropdownItem>
								<DropdownItem onClick={ () => this.props.setSort('alpha') }>Alphabetique</DropdownItem>
							</DropdownMenu>
						</UncontrolledDropdown>
					</Col>
				</Row>
			</Container>
		);
	}
}
