import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../imgs/absea-logo.png';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';


export class NavbarElem extends Component {
    render() {
        return(
        <Navbar collapseOnSelect expand="lg" bg="white">
            <Navbar.Brand href="/">
                <img alt="Anakbayan-Seattle Logo" src={logo} className="d-inline-block align-center"/>
                {' '}
                AB-SEATTLE
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                    <NavLink exact to="/" activeClassName="activeLink">Home</NavLink>
                    <NavLink to="/trackertable" activeClassName="activeLink">ED-Tracker</NavLink>
                    <NavLink to="/" activeClassName="activeLink">Campaigns</NavLink>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        )
    }
}
