import React, { Component } from "react";
import { Link } from "react-router-dom";
import CompanyInfo from "./CompanyInfo";
import ListGroup from 'react-bootstrap/ListGroup';

class GameList extends Component {
    state = {
        companies: [],
        loading: true,
      };
 
    componentDidMount(){
        fetch('https://api.streamstracker.com/top_companies')
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
          { this.state.companies.filter(function(company) {
            if (company.name === null) {
              return false;
            }
            return true;
          }).map(company => (
              <ListGroup.Item key={company.id} className="list-group-item list-group-item-primary">
                <ListGroup horizontal>
                  <Link to={(company.name === null) ? "/" : "/company/" + company.name}>
                    <CompanyInfo  logo_url={company.logo_url} 
                                  name={company.name} 
                                  viewers={company.viewers} 
                                  stock_ticker={company.stock_ticker}/>
                  </Link>
                </ListGroup>
              </ListGroup.Item>
            ))}
        </React.Fragment>
      );
  }
}
 
export default GameList;