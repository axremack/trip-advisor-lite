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

  constructor (props) {
    super(props);
  }

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
                             <DropdownItem>Note min</DropdownItem>
                             <DropdownItem>Note max</DropdownItem>
                             <DropdownItem>Alphabetique</DropdownItem>
                             <DropdownItem>Plus recent</DropdownItem>
                             <DropdownItem>Plus ancien</DropdownItem>
                         </DropdownMenu>
                     </UncontrolledDropdown>
                 </Col>
             </Row>
         </Container>
    );
  }
}
