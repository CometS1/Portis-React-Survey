import React from 'react';
import logo from './logo.svg';
import './App.css';

//import {PORTIS_ADDRESS} from "./constants.js"

import { abi } from './ABI/SurveyStorage.json';

import { Button } from 'react-bootstrap'
import { Nav, Navbar, Form, FormControl } from 'react-bootstrap'
import { ListGroup, ListGroupItem } from 'react-bootstrap'

//Include Bootstrap CSS
import './css/bootstrap.css';
import './css/bootstrap.min.css';

import Portis from '@portis/web3';
import Web3 from 'web3';

const PORTIS_ADDRESS = "5df91c2d-4e4b-4c86-a1bc-4a85b4f6ae33";
const CONTRACT_ADDRESS = "0x2CA21a68EE5791105d9FD88a3055Cd85cf7a39E4";

const portis = new Portis(PORTIS_ADDRESS, 'mainnet');
const web3 = new Web3(portis.provider);

//Testing to see if Wallet Address can be retrieved
function retrievePortisAddress() {
  web3.eth.getAccounts().then(accounts => {
    document.getElementById("portis").innerHTML = `<p>Wallet Address: ${
      accounts[0]
      }</p>`;
  });
}

const contract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);

//Testing to see if contract has been deployed
const createSurvey = async () => {
  try {

    var answer1 = "Yes";
    var answer2 = "No";
    let message = await contract.methods.createNewSurvey("Do you think you can dance?", answer1, answer2).call();
    console.log("Survey has probably been made");
    return message;

  } catch (error) {
    throw error;
  }
}

//Not working currently
const checkEvents = async () => {
  console.log("Did it work?");
  contract.getPastEvents('Do you think you can dance?', {
    fromBlock: 0,
    toBlock: 'latest'
  }, function (error, events) { console.log(events); })
    .then(function (events) {
      console.log(events) // same results as the optional callback above
    });
}

const checkSurvey = async () => {
  //const surveyContract = new web3.eth.Contract(abi, CONTRACT_ADDRESS);
  try {

    
    let results = await (contract.methods.retrieveSurveyQuestion().call());
    return results;

  } catch (error) {
    throw error;
  }
  
  // document.getElementById("portis").innerHTML = results;
  // return results;
}

//Note that you need to copy the abi json file every time you remigrate the contracts

function App() {
  return (
    <div className="App">

      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">Portis Surveys</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#link">Create New Survey</Nav.Link>
            <Nav.Link href="#gas-relay">Gas Relay</Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </Navbar>

      <ListGroup>
        <ListGroup.Item action onClick={retrievePortisAddress}>Test Portis Address Retrieval</ListGroup.Item>
        <ListGroup.Item action onClick={createSurvey}>Test survey creation</ListGroup.Item>
        <ListGroup.Item action onClick={checkEvents}>Check Events in Console</ListGroup.Item>
        <ListGroup.Item action onClick={checkSurvey}>Check if Survey was stored</ListGroup.Item>
        <ListGroup.Item>Are you the Video Game Boy?</ListGroup.Item>
      </ListGroup>
      <div id="portis"></div>
      <Button variant="primary">Create New Survey</Button>
    </div>
  );
}

export default App;
