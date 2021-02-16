import React, { Component } from 'react';
import {
    Container, 
    Row, 
    Col,
    Button
} from 'reactstrap';

export class PlaceCardDetailed extends Component {
  static displayName = PlaceCardDetailed.name;

  constructor (props) {
    super(props);
  }

 render() {
     return (
        <Container fluid>
            <Row>
                 <Col className="h3 p-0 font-weight-bold">Nom Lieu</Col>
                 <Col className="h3 text-right p-0">Ville</Col>
            </Row> 
            <Row>
                 <Col className="h5 px-0 pb-3">Note moyenne (nombre d'avis)</Col>
            </Row> 
            <Row className="pb-3">
                <img width="100%" src="/img_bidon.jpg" alt="Place image" />
            </Row> 
            <Row>
                <Button color="success">Ajouter un avis</Button>
            </Row>
        </Container>
    );
  }
}
