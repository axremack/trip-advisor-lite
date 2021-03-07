import React, { Component } from 'react';
import { PlaceCard } from './PlaceCard';

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
                 <div className="placeList">
                    {
                        places.map(place => {
                            return <PlaceCard key={place.placeId} id={place.placeId} title={place.title} city={place.city} />;
                        })
                    }
                </div>
            );
        }
        else {
            return (<div className='jumbotron '><h1 className="display-4">Aucun lieu ne correspond à votre recherche</h1></div>);
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
            <div>
                <section>
                    <h1>Résultats de la recherche</h1>
                    {SearchPage.renderPlacesList(this.state.Places)}
                </section>
            </div>
        );
  }
}
