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
        This is the Company Header for { this.state.company.name } - Great Company!
      </>
    )
  }
}

export default CompanyHeader;