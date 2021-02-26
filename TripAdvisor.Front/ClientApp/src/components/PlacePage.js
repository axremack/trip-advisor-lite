import React, { Component } from 'react';
import {
	Container,
	Row,
	Col,
	Button
} from 'reactstrap';
import { PlaceCommentCard } from './PlaceCommentCard';
import { PlaceCardDetailed } from './PlaceCardDetailed';
import { SortMenu } from './SortMenu';


export class PlacePage extends Component {
    static displayName = PlacePage.name;

  constructor (props) {
      super(props);
      this.state = {
          Comments: [],
          Place: [],
      };
    }

    componentDidMount() {
        this.populateCommentsList();
        this.findPlace();
    }

    static renderCommentsList(comments) {
        console.log(comments);
        if ((comments !== null) && (comments.length !== 0)) {
            return (
                <section>
                    { comments.map(comment => {
                        return <PlaceCommentCard key={comment.commentId} title={comment.title} user={comment.userId} rank={comment.rank} content={comment.content} date={comment.date} />})
                    }
                </section>
            );
        }
        else {
            return (<h1 style={{ color: '#FF0000' }}>Pas de commentaires</h1>);
        }
    }

    async populateCommentsList() {
        const res = await fetch('comments', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        console.log(res);

        if (res.ok) {
            res.json().then(data => this.setState({ Comments: data }));
        } else {
            this.setState({ Comments: null });
        }
    }

    async findPlace() {
        const res = await fetch('places/' + this.props.match.params.id, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });
        console.log(res);

        if (res.ok) {
            res.json().then(data => this.setState({ Place: data }));
        } else {
            this.setState({ Place: null });
        }
    }

 render() {
     return (
         <Container fluid className="pt-5">
             <Row>
                 <Col md="4" className="mr-4">
                     <PlaceCardDetailed key={this.state.Place.placeId} id={this.state.Place.placeId} title={this.state.Place.title} city={this.state.Place.city} />
                 </Col>
                 <Col className="mt-5">
                     <SortMenu />
                     {PlacePage.renderCommentsList(this.state.Comments)}
                 </Col>
             </Row>
         </Container>
    );
  }
}
