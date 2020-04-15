import React, { Component } from "react";
import CompanyInfo from "./CompanyInfo";

class GameList extends Component {
    state = {
        companies: [],
        loading: true,
      };
 
    componentDidMount(){
        fetch('https://api.streamcamel.com/top_companies?period=1w')
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
          Average Viewers Last Week
          { 
            
            this.state.companies.filter(function(company) {
            if (company.name === null) {
              return false;
            }
            return true;
          }).map(company => (
              <div class="ranked-item">
                    <CompanyInfo  position='#1' // TODO: Fix me
                                  logo_url={'https://images.igdb.com/igdb/image/upload/t_cover_small/' + company.image_id + '.png'} 
                                  name={company.name} 
                                  slug={company.slug}
                                  viewers={company.viewer_count_average} 
                                  stock_ticker={company.stock_ticker}/>
              </div>
            ))}
        </React.Fragment>
      );
  }
}
 
export default GameList;