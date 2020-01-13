import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import ViewerGraph from "./area charts/ViewerGraph"
import CompanyList from './CompanyList';
import GameList from './GameList';

class Template extends Component {
  
  render() {    
    return (
		<div>
			<Navbar bg="dark" variant="dark">
				<button className="d-lg-none toggle-sidebar">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Navbar.Brand href="/">StreamsTracker</Navbar.Brand>
				<Nav.Link href="/companies">Companies</Nav.Link>
				<Nav.Link href="/games">Games</Nav.Link>
			  </Navbar>		  
				<Container>
					<BrowserRouter>
						<Switch>
							<Route exact path="/">
								<ViewerGraph/>
									<ListGroup>
										<CompanyList/>
									</ListGroup>
							</Route>
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
						</Switch>
					</BrowserRouter>
				</Container>	
				<footer>
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