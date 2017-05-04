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
            <Link to="/map">
              <h4 style={{color:"#f8f8f8", fontWeight:"300", marginTop:"15px"}}>Map View</h4>
            </Link>
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
