import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ViewerGraph from "./area charts/ViewerGraph"
import CompanyList from './CompanyList';
import GameList from './GameList';
import ReactGA from 'react-ga';
import PrivacyPolicy from './PrivacyPolicy';
import PrivacyPolicyLink from './PrivacyPolicyLink';
import Ad from '../Ad';
import { createBrowserHistory } from 'history';
import ReactSearchBox from 'react-search-box'

const trackingId = "UA-85057016-2"; // Replace with your Google Analytics tracking ID
ReactGA.initialize(trackingId);


const history = createBrowserHistory();
// Initialize google analytics page view tracking
history.listen(location => {
  ReactGA.set({ page: location.pathname }); // Update the user's current page
  ReactGA.pageview(location.pathname); // Record a pageview for the given page
});

class Template extends Component {
  render() {    
    return (
		<div>
			<Ad/>
			<Navbar bg="dark" variant="dark">
				<button className="d-lg-none toggle-sidebar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Navbar.Brand href="/">StreamsTracker</Navbar.Brand>
				<Nav.Link href="/companies">Companies</Nav.Link>
				<Nav.Link href="/games">Games</Nav.Link>
				<ReactSearchBox placeholder="Search"
        			value=""
					data={this.data}
        			onChange={record => console.log(record)}
      			/>
			  </Navbar>		  
				<Container>
					Welcome to StreamsTracker. This Website shows you Live Streaming data from companies, games and streamers.
					<Router history={history}>
						<Switch>
							<Route exact path="/">
								<ViewerGraph/>
									<ListGroup>
										<CompanyList/>
									</ListGroup>
							</Route>
							<Route path="/privacy" render={({ match }) => {
									var companyName = decodeURIComponent(match.params.companyName);
									return <> <PrivacyPolicy/> </>;
								}} />
							<Route path="/company/:companyName" render={({ match }) => {
									var companyName = decodeURIComponent(match.params.companyName);
									return <> 
									          <span>Top games from {companyName}</span>
									          <GameList company={companyName} />
											  <ViewerGraph company={companyName} /> </>;
								}} />
							<Route path="/game/:gameName" render={({ match }) => {
									var gameName = decodeURIComponent(match.params.gameName);
									return <> 
									          <span>{gameName}</span>
											  <ViewerGraph game={gameName} /> </>;
								}} />
							<Route path="/games" render={({ match }) => {
									var gameName = decodeURIComponent(match.params.gameName);
									return <> 
									          <span>Top games</span>
									          <GameList />
											  <ViewerGraph /> </>;
								}} />
							<Route path="/companies" render={({ match }) => {
									var gameName = decodeURIComponent(match.params.gameName);
									return <> 
									          <span>Top Companies</span>
									          <CompanyList />
											  <ViewerGraph /> </>;
								}} />
						</Switch>
					</Router>
				</Container>	
				<footer>
					<PrivacyPolicyLink/>
					<p>Contact us to report a bug, or suggest a feature.</p>
					<ul class="list-inline">
						<li>StreamsTracker © 2019</li>
						<li><a href="mailto:robin@guibec.com">Contact</a></li>
					</ul>
				</footer>				
			</div>
    );
  }
}

export default Template;