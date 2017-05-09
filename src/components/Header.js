import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { Link } from 'react-router';

class Header extends React.Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect style={{margin:0, borderRadius:0}}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#">FlightSpace</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav pullRight>
            <NavItem onClick={this.props.displayMap}>Map View</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  displayMap: PropTypes.func,
};

export default Header;
