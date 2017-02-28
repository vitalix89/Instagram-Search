import React from 'react';
import { Link } from 'react-router';

import Collapse from 'reactstrap/lib/Collapse';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';


import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';


const Footer = props => (
  <div>
    <Navbar color="red" light toggleable>

      <NavbarBrand href="/"><span style={{ color: 'white' }}>Global Photo Search</span></NavbarBrand>
      <Collapse navbar>
        <Nav className="ml-auto" navbar>
          <NavItem />
          <NavItem>
            <NavLink tag={Link} className="text-center" to={'/privacy'}><span style={{ color: 'white' }}>Privacy</span></NavLink>
          </NavItem>
        </Nav>
      </Collapse>
    </Navbar>
  </div>
  );


export default Footer;
