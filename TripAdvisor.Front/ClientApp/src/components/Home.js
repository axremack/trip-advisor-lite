import React, { Component } from 'react';
import axios from 'axios';
import { PlaceCard } from './PlaceCard';

export class Home extends Component {
    static displayName = Home.name;

    constructor() {
        super();
        this.state = {
            Places: []
        }
    }

    componentDidMount() {
        this.populatePlacesList();
    }  

    static renderPlacesList(places) {
        console.log(places);
        if ((places != null) && (places.length != 0)) {
            return (
                <section>
                    <h1>Destinations populaires</h1>
                    {
                        places.map(place => {
                            return <PlaceCard key={place.PlaceId} title={place.Title} city={place.City} />;
                        })
                    }
                </section>
            );
        }
        else {
            return (<h1 style={{ color: '#FF0000' }}>Pas de lieu trouve</h1>);
        }
    }

    async populatePlacesList() {
        axios.get(`http://localhost/places`)
            .then(res => this.setState({ Places: res.data }));
    }

    render() {
        /* !!! NE MARCHE PAS !!!
        let [places, setPlaces] = useState([]);
        const [searchText, setSearchText] = useState(null);

        function createListPlaces() {
            useEffect(() => {
                fetch('http://localhost/places', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .then(res => res.json())
                    .then(data => setPlaces(data.filter(place => place.State.toLowerCase().includes(searchText))));
            }, [searchText]);
        }

        const search = ""; //text => { setSearchText(text) };
        
        const listPlaces = places
            .flatMap(place => ({ ...place, id: place.PlaceId, title: place.Title, city: place.City }))
            .map(card => <PlaceCard key={card.id} title={card.title} city={card.city} />);
        */
        return (
          <div>
                {Home.renderPlacesList(this.state.Places)}
          </div>
        );
  }
}
