import React, { Component } from "react";
import { Link } from "react-router-dom";

class GameInfo extends Component {
    state = {
        logo_url: "",
        name: "",
        viewers: 0,
      };
 
    componentDidMount(){
        var image = this.props.logo_url.replace("{width}", "70").replace("{height}", "70");

        this.setState({
            logo_url: image,
            game_id: this.props.game_id,
            name: this.props.name,
            slug: this.props.slug,
            viewers: this.props.viewers
        });
    }


  render() {
    return (
      <>
        <div class="ri-image">
            <img src={this.state.logo_url}/>
        </div>
        <div class="ri-name">
            <Link to={(this.state.slug === null) ? "/" : "/game/" + encodeURIComponent(this.state.slug)}>
                {this.state.name}
            </Link>
        </div>
        <div class="ri-info">
            <Link to={(this.state.slug === null) ? "/" : "/game/" + encodeURIComponent(this.state.slug)}>
                {this.state.viewers}
            </Link>
        </div>
      </>
    )
  }
}

export default GameInfo;