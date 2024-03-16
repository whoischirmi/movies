import React from "react";
import { Movies } from "../components/Movies";
import { Search } from "../components/search";
import { Preloader } from "../components/preloader";

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    };
    componentDidMount() {
        fetch("http://www.omdbapi.com/?apikey=b7e92076&s=Matrix")
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading: false}));
    }

    searchMovies = (str, type = "all") => {
        fetch(
            `http://www.omdbapi.com/?apikey=b7e92076&s=${str}${type !== "all" ? `&type=${type}` : ""}'` )  //после в ссылке идет   
        .then((response) => response.json())
        .then((data) => this.setState({ movies: data.Search, loading: false}));
    }

    render() {
        const { movies, loading } = this.state;

        return (
            <main className="container content">
                <Search searchMovies={this.searchMovies} />
                {loading ? < Preloader /> : <Movies movies={this.state.movies} />}
            </main>
        )
    }
}

export { Main };