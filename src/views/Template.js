import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';
import GameList from './GameList';

import {
  Route,
  NavLink,
  BrowserRouter
} from "react-router-dom";

import AreaChart from "./area charts/Area Chart";

class Template extends Component {
  
  render() {    
    return (
		<div>
			<Navbar bg="dark" variant="dark">
				<button className="d-lg-none toggle-sidebar" class="collapse-navbar collapse">
					<span className="navbar-toggler-icon"></span>
				</button>
				<Navbar.Brand href="/">StreamsTracker</Navbar.Brand>

				<span className="hidden-xs text-muted">Global Stats</span>

			  </Navbar>		  
			  <BrowserRouter>		  
					<Row>
						<Nav to="/" className="flex-sm-column" id="sidebar">
							<ListGroup className="nav nav-sidebar flex-sm-column">
								<ListGroup.Item>
									<a href="#areaCharts" data-toggle="collapse" aria-expanded="true" className="dropdown-toggle">
								 	<span>Top Games</span></a>
								</ListGroup.Item>
								<ListGroup>
									<GameList/>
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