import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <div class="ri-image">
            <img src={this.state.logo_url}/>
        </div>
        <div class="ri-name">
            <Link to={(this.state.name === null) ? "/" : "/company/" + this.state.name}>
                {this.state.name}
            </Link>
        </div>
        <div class="ri-info">
            <Link to={(this.state.name === null) ? "/" : "/company/" + this.state.name}>
                {this.state.viewers}
            </Link>
        </div>
        {this.state.stock_ticker}
      </>
    )
  }
}

export default CompanyInfo;