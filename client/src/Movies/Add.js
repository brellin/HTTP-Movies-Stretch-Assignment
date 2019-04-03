import React, { Component } from 'react'
import axios from 'axios';

export default class Add extends Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {
                title: '',
                director: '',
                metascore: '',
                stars: []
            }
        }
    }

    submitMovie = movie => {
        axios.post('http://localhost:5000/api/movies', movie)
            .then(res => {
                this.props.history.goBack();
                console.log(res)
            })
            .catch(err => console.log(err))
    }

    sendMovie = e => {
        e.preventDefault();
        let movie = {
            title: this.state.movie.title,
            director: this.state.movie.director,
            metascore: this.state.movie.metascore,
            stars: this.state.movie.stars.split(',')
        }
        this.submitMovie(movie)
    }

    handleChanges = e => {
        this.setState({
            movie: {
                ...this.state.movie,
                [e.target.name]: e.target.value
            }
        })
    }

    render() {
        return (
            <form className='addForm' onSubmit={this.sendMovie}>
                <input
                    onChange={this.handleChanges}
                    name='title'
                    value={this.state.movie.title}
                />
                <input
                    onChange={this.handleChanges}
                    name='director'
                    value={this.state.movie.director}
                />
                <input
                    onChange={this.handleChanges}
                    name='metascore'
                    value={this.state.movie.metascore}
                />
                <input
                    onChange={this.handleChanges}
                    name='stars'
                    value={this.state.movie.stars}
                />
                <button>Send</button>
            </form>
        )
    }
}

