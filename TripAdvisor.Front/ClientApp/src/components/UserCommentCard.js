import React, { Component } from 'react';
import {
  Container,
  Row,
  Col,
  Button
} from 'reactstrap';

export class CommentCard extends Component {
  static displayName = CommentCard.name;

  constructor(props) {
      super(props);
  }

  render() {
      return (
          <Container fluid className="border">
              <Row className="pt-5">
                  <Col className="h4 font-weight-bold">Lieu</Col>
              </Row>
              <Row className="pb-0">
                  <Col className="h5 font-weight-bold">Titre avis récent</Col>
                  <Col className="h5 font-weight-bold text-right">Nom auteur</Col>
              </Row>
              <Row className="pb-2">
                  <Col>Les bords de l'Allier ......... blablablabla</Col>
              </Row>
          </Container>
      );
  }
}