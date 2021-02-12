import React, { Component } from 'react';
import {
    Form,
    Button,
    Input
} from 'reactstrap';

export class SearchBar extends Component {
  static displayName = SearchBar.name;

  constructor (props) {
    super(props);
  }

 render() {
    return (
        <Form inline className="ml-5">
            <Input type="search" placeholder="Recherche un lieu" className="mr-sm-2" />
            <Button variant="outline-success" type="submit">Rechercher</Button>{' '}
        </Form>   
    );
  }
}
