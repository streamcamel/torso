import React, { Component } from "react";
import { Link } from "react-router-dom";
 
class GameList extends Component {
    state = {
        companies: [],
        loading: true,
      };
 
    componentDidMount(){
        fetch('http://api.streamstracker.com/top_companies')
          .then(res => res.json())
          .then(res => {
              this.setState({
                  companies: res,
                  loading: false
              })
          })
    }

    render() {
      if (this.state.loading) {
        return <div>Loading...</div>
      }
      
    return (
      <React.Fragment>
        {this.state.companies.map(company => (
            <li key={company.id} className="list-group-item list-group-item-primary">
              <Link to={(company.name === null) ? "/" : "/company/" + company.name}>
              <div id="logo"><img src={company.logo_url}/></div>
                  {company.name === null ? "Unknown Company" : company.name} Viewers: {company.viewers}
                  {company.ticker !== undefined ? 'Ticker'+company.stock_ticker : ''}
              </Link>
            </li>
          ))}
      </React.Fragment>
    );
  }
}
 
export default GameList;