import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import React, { Component } from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ViewerGraph from "./area charts/ViewerGraph"
import GameHeader from "./GameHeader";
import CompanyHeader from "./CompanyHeader"
import CompanyList from './CompanyList';
import SearchResult from './SearchResult';
import GameList from './GameList';
import ReactGA from 'react-ga';
import PrivacyPolicy from './PrivacyPolicy';
import PrivacyPolicyLink from './PrivacyPolicyLink';
import Ad from '../Ad';
import { createBrowserHistory } from 'history';
// import ReactSearchBox from 'react-search-box'
import SearchBox from './SearchBox';

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
			{/* <Ad/> */}
			<Navbar bg="dark" variant="dark">
				<Navbar.Brand href="/">Stream Camel</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
				<Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
				<Nav className="mr-auto">
					<Nav.Link href="/companies">Companies</Nav.Link>
					<Nav.Link href="/games">Games</Nav.Link>
					<Nav.Link href="/press/index.php">Press Kit</Nav.Link>
				</Nav>
			  </Navbar>		  
				<Container>
					<Router history={history}>
						<SearchBox/>
						<Switch>
							<Route exact path="/">
								Welcome to Stream Camel. 
								<h2>MOST WATCHED COMPANIES ON TWITCH</h2>
								<p class="text-center">Ranked by live concurrent viewers</p>
								<ViewerGraph/>
									<ListGroup>
										<CompanyList/>
									</ListGroup>
							</Route>
							<Route path="/privacy" render={({ match }) => {
									var companyName = decodeURIComponent(match.params.companyName);
									return <> <PrivacyPolicy/> </>;
								}} />
							<Route path="/company/:companySlug" render={({ match }) => {
									var companySlug = decodeURIComponent(match.params.companySlug);
									return <> 
											  <CompanyHeader company={companySlug} />
									          <GameList company={companySlug} />
											  <ViewerGraph company={companySlug} /> </>;
								}} />
							<Route path="/game/:gameSlug" render={({ match }) => {
									var gameSlug = decodeURIComponent(match.params.gameSlug);
									return <> 
									          <GameHeader game={gameSlug} />
											  <ViewerGraph game={gameSlug} /> </>;
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
									          <span>Current Top Companies sorted by Live Viewers</span>
									          <CompanyList />
											  <ViewerGraph /> </>;
								}} />
							<Route path="/search/:search" render={({ match }) => {
								var search = decodeURIComponent(match.params.search);
								return <> 
											<span>Search Result Page for {search}</span>
											<SearchResult query={search}/> </>;
							}} />
						</Switch>
					</Router>
				</Container>	
				<footer>
					<PrivacyPolicyLink/>
					<p>Contact us to report a bug, or suggest a feature.</p>
					<ul class="list-inline">
						<li>Stream Camel © 2019-2020</li>
						<li><a href="mailto:robin@guibec.com">Contact</a></li>
					</ul>
				</footer>				
			</div>
    );
  }
}

export default Template;