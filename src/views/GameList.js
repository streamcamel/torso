import React, { Component } from "react";
 
class GameList extends Component {
    state = {
        games: [],
        loading: true,
        listitems: ["Ubisoft", "Riot", "Blizzard", "Valve", "Mojang"],

      };
 
    componentDidMount(){
        fetch('http://lecalculriche.com:8800/top_games')
          .then(res => res.json())
          .then(res => {
              //console.log(res)
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
                {game.name} Viewers: {game.viewers}
            </li>
          ))}
      </React.Fragment>
    );
  }
}
 
export default GameList;