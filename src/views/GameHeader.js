import React, { Component } from "react";

class GameHeader extends Component {
    state = {
        slug: "",
        loading: true,
      };
 
    componentDidMount(){
        fetch('https://api.streamcamel.com/games/' + this.props.game)
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
        <h2> { this.state.game.name }</h2>
        <img class="cover" src={this.state.game.box_art_url.replace("{width}", "280").replace("{height}", "210")}/>
      </>
    )
  }
}

export default GameHeader;