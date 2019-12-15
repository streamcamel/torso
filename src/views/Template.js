import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import React, { Component } from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Row from 'react-bootstrap/Row';
import { BrowserRouter, Route } from "react-router-dom";
import AreaChart from "./area charts/Area Chart";
import CompanyList from './CompanyList';




class Template extends Component {
  
  render() {    
    return (
		<div>
			<Navbar bg="dark" variant="dark">
				<button className="d-lg-none toggle-sidebar" class="collapse-navbar collapse">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Navbar.Brand href="/">StreamsTracker</Navbar.Brand>
				<Nav.Link href="/games">Companies</Nav.Link>
				<Nav.Link href="/companies">Games</Nav.Link>
			  </Navbar>		  
			  <BrowserRouter>		  
					<Row>
						<Nav to="/" className="flex-sm-column" id="sidebar">
							<ListGroup className="nav nav-sidebar flex-sm-column">
								<ListGroup.Item>
									<a href="#areaCharts" data-toggle="collapse" aria-expanded="true" className="dropdown-toggle">
								 	<span>Top Companies</span></a>
								</ListGroup.Item>
								<ListGroup>
									<CompanyList/>
								</ListGroup>
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
								<ListGroup.Item role="separator" className="divider"></ListGroup.Item>
								
							</ListGroup>
						</Nav>
						
						<Col xl={{ span: 7, offset: 3 }} lg={{ span: 8, offset: 3 }} xs={{ span: 8, offset: 2 }}>
							<Container>
								<div className="content">
									<Route path="/area-chart" component={AreaChart}/>
								</div>
							</Container>
						</Col>					
					</Row>			
			  </BrowserRouter>	
			</div>
    );
  }
}

export default Template;