import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AreaChart from "./area charts/Area Chart";
import CompanyList from './CompanyList';

function GraphChart() {
  // We can use the `useParams` hook here to access
  // the dynamic pieces of the URL.
  let { companyId } = useParams();
  return (<AreaChart company={companyId}/>);
}

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
				<span>Top Companies</span>
				<ListGroup>
					<CompanyList/>
				</ListGroup>
				<Container>
					<BrowserRouter>
						<Switch>
							<Route exact path="/" component={AreaChart} />
							<Route path="/company/:companyId" children={<GraphChart />} />
						</Switch>
					</BrowserRouter>
				</Container>	
				<footer>
					<p>Get in touch, report a bug or incorrect information, suggest a feature.</p>
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