import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompanyInfo extends Component {
    state = {
        logo_url: "",
        name: "",
        slug: "",
        viewers: 0,
        stock_ticker: ""
      };
 
    componentDidMount(){
        this.setState({
            position: this.props.position,
            logo_url: this.props.logo_url,
            name: this.props.name,
            slug: this.props.slug,
            viewers: this.props.viewers,
            stock_ticker: this.props.stock_ticker
        });
    }

  fetchCompanyDetails = () => {
    console.log("You click on me!!");
  }


  render() {
    return (
      <>
        <div class="ri-position hidden-xxs" title="" data-original-title="Ranking Position"></div>

        <div class="ri-image">
          <Link to={(this.state.slug === null) ? "/" : "/company/" + this.state.slug}>
            <img src={this.state.logo_url}/>
          </Link>
      
        </div>
        <div class="ri-name">
            <Link to={(this.state.slug === null) ? "/" : "/company/" + this.state.slug}>
                {this.state.name}
            </Link>
        </div>
        <div class="ri-value">
            <Link to={(this.state.slug === null) ? "/" : "/company/" + this.state.slug}>
                {this.state.viewers}
            </Link>
        </div>
        <div class="ri-value">
          <Link to={(this.state.slug === null) ? "/" : "/company/" + this.state.slug}>
            {this.state.stock_ticker}
          </Link>
        </div>
      </>
    )
  }
}

export default CompanyInfo;