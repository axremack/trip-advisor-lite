import React, { Component } from 'react';
import {
    Container,
    Row,
    Col
} from 'reactstrap';
import { UserCommentCard } from "./UserCommentCard"
import { UserCardDetailed } from "./UserCardDetailed"
import { SortMenu } from './SortMenu';



export class UserPage extends Component {
    static displayName = UserPage.name;

    constructor(props) {
        super(props);
        this.state = {
            Comments: [],
            User: [],
            token: props.userId
        };
    }

    static getDerivedStateFromProps(props, state) {
        if (props.userId !== state.token) {
            return {
                token: props.userId
            };
        }

        return null;
    }

    componentDidMount() {
        this.findUser();
        this.populateCommentsList();
    }

    setSort = (nSort) => {
        if (nSort !== this.state.sort) {
            this.setState({
                sort: nSort
            });
        }
    }

    renderCommentsList = () => {
        if ((this.state.Comments !== null) && (this.state.Comments.length !== 0)) {
            switch (this.state.sort) {
                case 'old':
                    this.state.Comments.sort(function (a, b) {
                        return (new Date(a.date) < new Date(b.date) ? -1 : 1);
                    });
                    break;
                case 'min-rank':
                    this.state.Comments.sort(function (a, b) {
                        return (a.rank < b.rank ? -1 : 1);
                    });
                    break;
                case 'max-rank':
                    this.state.Comments.sort(function (a, b) {
                        return (a.rank > b.rank ? -1 : 1);
                    });
                    break;
                case 'alpha':
                    this.state.Comments.sort(function (a, b) {
                        return (a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
                    });
                    break;
                default:
                    this.state.Comments.sort(function (a, b) {
                        return (new Date(a.date) > new Date(b.date) ? -1 : 1);
                    });
            }

            return (
                <section>
                    { this.state.Comments.map(comment => {
                        return <UserCommentCard key={comment.commentId} title={comment.title} place={comment.placeId} rank={comment.rank} content={comment.content} date={comment.date} />
                    })
                    }
                </section>
            );
        }
        else {
            return (<div className='jumbotron '><h2 className="display-4">Aucun avis posté</h2></div>);
        }
    }

    async populateCommentsList() {
        const res = await fetch('comments/user/' + this.props.match.params.id, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });

        if (res.ok) {
            res.json().then(data => this.setState({ Comments: data }));
        } else {
            this.setState({ Comments: null });
        }
    }

    async findUser() {
        const res = await fetch('users/' + this.props.match.params.id, {
            method: 'GET',
            headers: { 'Content-type': 'application/json' }
        });

        if (res.ok) {
            res.json().then(data => this.setState({ User: data }));
        } else {
            this.setState({ User: null });
        }
    }

    render() {
        return (
            <Container fluid className="pt-5">
                <Row>
                    <Col md="4" className="mr-4">
                        <UserCardDetailed key={this.state.User.userId} id={this.state.User.userId} firstname={this.state.User.firstName} surname={this.state.User.surName} token={this.state.token} />
                    </Col>
                    <Col className="mt-5">
                        <SortMenu setSort={this.setSort} />
                        {this.renderCommentsList()}
                    </Col>
                </Row>
            </Container>
        );
    }
}