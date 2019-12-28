import React, { Component } from "react";
import { Link } from "react-router-dom";
 
class GameList extends Component {
    state = {
        games: [],
        loading: true,
      };
 
    componentDidMount(){
      var filterParameter = '';
      if (this.props.company) {
        filterParameter = '?company=' + this.props.company;
      } else if (this.props.game) {
        filterParameter = '?game=' + this.props.game;
      }

      fetch('https://api.streamstracker.com/top_games' + filterParameter)
        .then(res => res.json())
        .then(res => {
            this.setState({
                games: res,
                loading: false
            })
        })
    }

  render() {
    if (this.state.loading) {
        return <div>Loading...</div>
      }
      
    return (
      <React.Fragment>
        {this.state.games.map(game => (
            <li key={game.id} className="list-group-item list-group-item-primary">
              <Link to={(game.name === null) ? "/" : "/game/" + game.name}>
                {game.name} Viewers: {game.viewers}
              </Link>

            </li>
          ))}
      </React.Fragment>
    );
  }
}
 
export default GameList;