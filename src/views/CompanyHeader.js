import React, { Component } from "react";
import { Link } from "react-router-dom";

class CompanyHeader extends Component {
    state = {
        slug: "",
        loading: true,
      };
 
    componentDidMount(){
      var companyUrl = 'https://api.streamcamel.com/companies/' + this.props.company;
      var viewerUrl = 'https://api.streamcamel.com/viewers?before=' + '2020-04-01T01:42:05.947Z&after=2019-04-01T01:42:05.947Z&company=epic-games';

      var fetchData = () => {
        const urls = [
          companyUrl,
          viewerUrl
        ];

        const allRequests = urls.map(url => 
          fetch(url).then(response => response.json())
          );

        return Promise.all(allRequests);
      };

      fetchData().then(arrayOfResponses => {
        //console.log("The data we got from the server:", arrayOfResponses);

            this.setState({
                 company: arrayOfResponses[0][0],
                 viewers: arrayOfResponses[1],
                 slug: this.props.company,
                 loading: false
             });
            });
    }

  /**
   * Get the average viewers for the last numDays
   * If there are less than numDays available, then stop after
   */
  averageViewers(numDays) {
    var sum = 0;
    var i;
    for (i = 0; i < Math.min(this.state.viewers.length, numDays); ++i) {
      sum += this.state.viewers[i].viewers_count;
    }

    if (i == 0) {
      return 0;
    } else {
      return sum / i;
    }
  }

  render() {
    if (this.state.loading) {
        return <div>Loading...</div>
    }

    return (
      <>
        <h2> { this.state.company.name }</h2>
        <img class="cover" src={ "https:" + this.state.company.url.replace("/t_thumb/", "/t_logo_med/")}/>
        <h3>Last Week</h3>
        <p>Hours Streamed: </p>
        <p>Average Viewers: { Math.ceil(this.averageViewers(7)) }</p>
        <p>Peak Viewers: </p>
        <p>Hours Watched: </p>
      </>
    )
  }
}

export default CompanyHeader;