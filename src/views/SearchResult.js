import React, { Component } from "react";
import CompanyInfo from "./CompanyInfo";

class SearchResult extends Component {
    state = {
        companies: [],
        loading: true,
      };
 
    componentDidMount(){
      console.log(this.props);

      var filterParameter = '';
      if (this.props.query) {
        filterParameter = '?q=' + this.props.query;
      }

      fetch('https://api.streamstracker.com/search_companies' + filterParameter)
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
              <div class="ranked-item">
                    <CompanyInfo  logo_url={'https://images.igdb.com/igdb/image/upload/t_cover_small/' + company.image_id + '.png'} 
                                  name={company.name} 
                                  viewers={company.viewers} 
                                  stock_ticker={company.stock_ticker}/>
              </div>
            ))}
        </React.Fragment>
      );
  }
}
 
export default SearchResult;