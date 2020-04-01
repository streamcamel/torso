import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompanyHeader extends Component {
    state = {
        slug: "",
        loading: true,
      };
 
    componentDidMount(){
        fetch('https://api.streamcamel.com/companies/' + this.props.company)
        .then(res => res.json())
        .then(res => {
            this.setState({
                company: res[0],
                slug: this.props.company,
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
        <h2> { this.state.company.name }</h2>
        <img class="cover" src={ "https:" + this.state.company.url.replace("/t_thumb/", "/t_logo_med/")}/>
      </>
    )
  }
}

export default CompanyHeader;