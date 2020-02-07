import React, { Component } from "react";

class GameHeader extends Component {
    state = {
        slug: "",
        loading: true,
      };
 
    componentDidMount(){
        fetch('https://api.streamstracker.com/games/' + this.props.game)
        .then(res => res.json())
        .then(res => {
            this.setState({
                game: res[0],
                slug: this.props.game,
                loading: false
            })
        })
    }

  render() {
    if (this.state.loading) {
        return <div>Loading...</div>
    }

    return (
      <>
        This is the Game Header for { this.state.game.name } - Great Game!
      </>
    )
  }
}

export default GameHeader;