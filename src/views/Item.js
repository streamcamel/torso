import React, { Component } from "react";
 
class GameList extends Component {
  state = {};
 
  render() {
    return (
      <React.Fragment>
        <ul class="list-group">
          <li class="list-group-item list-group-item-primary">List item 1</li>
          <li class="list-group-item list-group-item-primary">List item 2</li>
          <li class="list-group-item list-group-item-primary">List item 3</li>
        </ul>
      </React.Fragment>
    );
  }
}
 
export default Item;