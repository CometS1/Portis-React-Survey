import React from 'react';
import logo from './logo.svg';
import './App.css';

import {PORTIS_ADDRESS} from "./constants.js"

import { Button } from 'react-bootstrap'
import { Nav, Navbar, NavDropdown, Form, FormControl, Container } from 'react-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

//Include Bootstrap CSS
import './css/bootstrap.css';
import './css/bootstrap.min.css';

import Portis from '@portis/web3';
import Web3 from 'web3';

const PORTIS_ADDRESS = "5df91c2d-4e4b-4c86-a1bc-4a85b4f6ae33";

const portis = new Portis(PORTIS_ADDRESS, 'mainnet');
const web3 = new Web3(portis.provider);

/*portisAccount = () => {
  web3.eth.getAccounts().then(accounts => {
    document.getElementById("portis").innerHTML = `<p>Wallet Address: ${
      accounts[0]
      }</p>`;
  });
}*/
function retrievePortisAddress() {
  web3.eth.getAccounts().then(accounts => {
    document.getElementById("portis").innerHTML = `<p>Wallet Address: ${
      accounts[0]
      }</p>`;
  });
}

function App() {
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Portis Surveys</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Link</Nav.Link>
            <NavDropdown title="Dropdown" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <ListGroup>
        <ListGroup.Item action onClick={retrievePortisAddress}>Do you like Cats?</ListGroup.Item>
        <ListGroup.Item>Do you like Dogs?</ListGroup.Item>
        <ListGroup.Item>Do you like animals?</ListGroup.Item>
        <ListGroup.Item>Do you like portis?</ListGroup.Item>
        <ListGroup.Item>Are you the Video Game Boy?</ListGroup.Item>
      </ListGroup>
      <div id="portis"></div>
      <Button variant="primary">Create New Survey</Button>
    </div>
  );
}

export default App;
