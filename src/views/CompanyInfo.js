import React, { Component } from "react";
import ListGroup from 'react-bootstrap/ListGroup';

class CompanyInfo extends Component {
    state = {
        logo_url: "",
        name: "",
        viewers: 0,
        stock_ticker: ""
      };
 
    componentDidMount(){
        this.setState({
            logo_url: this.props.logo_url,
            name: this.props.name,
            viewers: this.props.viewers,
            stock_ticker: this.props.stock_ticker
        });
    }


  render() {
    return (
      <>
        <ListGroup.Item><img src={this.state.logo_url}/></ListGroup.Item>
        <ListGroup.Item>{this.state.name}</ListGroup.Item>
        <ListGroup.Item>{this.state.viewers}</ListGroup.Item>
        <ListGroup.Item>{this.state.stock_ticker}</ListGroup.Item>
      </>
    )
  }
}

export default CompanyInfo;