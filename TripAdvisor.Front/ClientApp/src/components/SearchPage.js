import React, { Component } from 'react';
import { PlaceCard } from './PlaceCard';
import {
    Container,
    Row,
    Col
} from 'reactstrap';

export class SearchPage extends Component {
    static displayName = SearchPage.name;

    constructor(props) {
        super(props);
        this.state = {
            Places: [],
            Text: this.props.match.params.text
        }
    }

    componentDidMount() {
        this.populatePlacesList();
    }

    static renderPlacesList(places) {
        if ((places !== null) && (places.length !== 0)) {
            return (
                 <Row className="placeList">
                    {
                        places.map(place => {
                            return <PlaceCard key={place.placeId} id={place.placeId} title={place.title} city={place.city} />;
                        })
                    }
                </Row>
            );
        }
        else {
            return (<div className='jumbotron '><h2 className="display-4">Aucun lieu ne correspond à votre recherche</h2></div>);
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.match.params.text !== state.Text) {
            return {
                Text: props.match.params.text
            };
        }

        return null;
    }

    async populatePlacesList() {
        const res = await fetch('places', {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });

        if (res.ok) {
            const searchText = this.state.Text.toLowerCase();

            res.json().then(data => this.setState({
                Places: data.filter(place =>
                    (
                        place.street.toLowerCase().includes(searchText) ||
                        place.city.toLowerCase().includes(searchText) ||
                        place.state.toLowerCase().includes(searchText)
                    )
                )
            }));
        } else {
            this.setState({ Places: null });
        }
    }

    render() {
        return (
            <Container className="mb-5 px-5">
                <Row className="mb-3">
                    <h2>Résultats de la recherche</h2>
                </Row>
                {SearchPage.renderPlacesList(this.state.Places)}
            </Container>
        );
  }
}
