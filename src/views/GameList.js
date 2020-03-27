import React, { Component } from "react";
import { Link } from "react-router-dom";
import GameInfo from "./GameInfo";
 
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

      fetch('https://api.streamcamel.com/top_games' + filterParameter)
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
              <div class="ranked-item">
                <GameInfo     logo_url={game.box_art_url} 
                              name={game.name} 
                              slug={game.slug}
                              viewers={game.viewers} 
                              game_id={game.game_id}/>
              </div>
          ))}
      </React.Fragment>
    );
  }
}
 
export default GameList;