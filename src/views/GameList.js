import React, { Component } from "react";
 
class GameList extends Component {
    state = {
        games: [],
        loading: true,
      };
 
    componentDidMount(){
        fetch('http://api.streamstracker.com/top_games')
          .then(res => res.json())
          .then(res => {
              console.log(res)
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