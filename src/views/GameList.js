import React, { Component } from "react";
 
class GameList extends Component {
    state = {
        games: [],
        loading: true,
      };
 
    componentDidMount(){
      var companyParameter = '';
      if (this.props.company) {
        companyParameter = '?company=' + this.props.company;
      }

      console.log(companyParameter)

      fetch('http://api.streamstracker.com/top_games' + companyParameter)
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
                {game.name} Viewers: {game.viewers}

            </li>
          ))}
      </React.Fragment>
    );
  }
}
 
export default GameList;