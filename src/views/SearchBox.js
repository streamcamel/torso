import React, { Component } from 'react';
import { Route , withRouter} from 'react-router-dom';
import PropTypes from 'prop-types'
import { useHistory } from "react-router-dom";

class SearchBox extends Component {
    constructor(props) {
        super(props)
        this.state = { search: '' }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
      }
    
    handleChange(event) {
        this.setState({ search: event.target.value })
      }
  
    handleSubmit(event) {
       this.props.history.push('/search/' + this.state.search )
    }
  
    render() {
      return (
        <form onSubmit={this.handleSubmit}>
          <label>
            <input type="text" placeholder="Search..." onChange={this.handleChange} />
          </label>
          <input type="submit" value="Search" />
        </form>
      );
    }
  }

  export default withRouter(SearchBox);