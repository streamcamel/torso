import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import AreaChart from "./area charts/Area Chart";
import CompanyList from './CompanyList';

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
				<AreaChart company='Valve'/>
				</Container>	
				<footer>
					<p>Get in touch, report a bug or incorrect information, suggest a feature.</p>
					<ul class="list-inline">
						<li>StreamsTracker © 2019</li>
						<li><a href="mailto:contact@streamstracker.com">Contact</a></li>
					</ul>
				</footer>				
			</div>
    );
  }
}

export default Template;