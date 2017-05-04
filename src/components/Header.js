import React, { PropTypes } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

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
            <NavItem eventKey={1} href="/map">Map View</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  }
}

Header.propTypes = {
  username: PropTypes.string,
};

export default Header;
