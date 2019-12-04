import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import ListGroup from 'react-bootstrap/ListGroup';

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
				<button className="d-lg-none toggle-sidebar"><span className="navbar-toggler-icon"></span></button>
				<Navbar.Brand href="/">LavaLiveStats</Navbar.Brand>

				<span className="hidden-xs text-muted">Global Stats</span>

			  </Navbar>		  
			  <BrowserRouter>		  
					<Row>
						<Nav to="/" className="flex-sm-column" id="sidebar">
							<ListGroup className="nav nav-sidebar flex-sm-column">
								<ListGroup.Item>
									<a href="#areaCharts" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">
								 	<span>Top Companies</span></a>
								</ListGroup.Item>
								<ListGroup>
									<ListGroup className="sub-menu collapse" id="areaCharts">
										<ListGroup.Item> <NavLink to="/area-chart">Ubisoft</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/area-chart">Riot</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/area-chart">Blizzard</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/area-chart">Valve</NavLink></ListGroup.Item>
										<ListGroup.Item> <NavLink to="/area-chart">Mojang</NavLink></ListGroup.Item>
									</ListGroup>
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