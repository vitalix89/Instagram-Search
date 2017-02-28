import React from 'react';
import { Link, browserHistory } from 'react-router';

import Footer from './Footer';

import Collapse from 'reactstrap/lib/Collapse';
import Navbar from 'reactstrap/lib/Navbar';
import NavbarToggler from 'reactstrap/lib/NavbarToggler';
import NavbarBrand from 'reactstrap/lib/NavbarBrand';


import Nav from 'reactstrap/lib/Nav';
import NavItem from 'reactstrap/lib/NavItem';
import NavLink from 'reactstrap/lib/NavLink';
import InputGroup from 'reactstrap/lib/InputGroup';
import InputGroupButton from 'reactstrap/lib/InputGroupButton';


import { connect } from 'react-redux';
import { searchImages } from '../../actions/apicalls';

class NavBar extends React.Component {


  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      isOpen: false
    };
  }
  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  state = { searchTerm: '', isOpen: false };


  handleInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  }


  handleSubmitButton = (e) => {
    e.preventDefault();
    if (!this.state.searchTerm) {
      alert('enter values');
    } else {
      this.props.searchImages(this.state.searchTerm);
      browserHistory.push(`/location/${this.state.searchTerm}`);
      this.setState({ searchTerm: '' });
    }
  }


  handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      if (!this.state.searchTerm) return;

      this.props.searchImages(this.state.searchTerm);
      browserHistory.push(`/location/${this.state.searchTerm}`);
      this.setState({ searchTerm: '' });
    }
  }


  render() {
    return (
      <div>
        <Navbar color="faded" light toggleable>
          <NavbarToggler className="hidden-xs-down" size="sm" right onClick={this.toggle} />
          <NavbarBrand className="instagramFa" href="/"><i className="fa fa-globe" aria-hidden="true" /> Global Photo Search</NavbarBrand>

          <Collapse isOpen="true" navbar>
            <Nav className="ml-auto" navbar>
              <NavItem >

                <InputGroup size="sm" className="col-lg-6 pull-left ">
                  <input className="form-control" type="text" placeholder="Israel, Tel-Aviv" value={this.state.searchTerm} onChange={this.handleInputChange} onKeyDown={this.handleKeyPress} autoFocus />
                  <InputGroupButton className="btn btn-xs btn-primary btn-block private" onClick={this.handleSubmitButton} color="secondary">Search.. </InputGroupButton>

                </InputGroup>
              </NavItem>
              <NavLink tag={Link} className="text-center" to={'/map'}><a className="icon">Map</a></NavLink>


              <NavItem />


              <NavLink className="hidden-sm-up text-center" tag={Link} to={'/privacy'}>Privacy</NavLink>


            </Nav>
          </Collapse>
        </Navbar>

        <div>

          {this.props.children}
        </div>

        <div className="footer">
          <Footer />
        </div>


      </div>

    );
  }
}

export default connect(state => ({
  images: state.images
}), { searchImages })(NavBar);

