import React, { Component } from 'react';
import {Menu, Dropdown} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default class AppNavbar extends Component {
  
  //Navbar active item
  state = { activeItem: '' }
  handleItemClick = ({ name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state

    var smallScreen=false;
    if (window.screen.width<=400){
      smallScreen=true;
    }

    return (
      <div className="big-nav">
        <Menu secondary>
          {smallScreen ? (<>
            <Menu.Item as={Link} to='/'>
          <h1 className="nav-title" id="nav-title">The Backbeat</h1>
          </Menu.Item>
          <Menu.Menu position='right'>
            <Dropdown item icon="align justify">
              <Dropdown.Menu>
                <Dropdown.Item as={Link} to='/sounds'>Sounds</Dropdown.Item>
                <Dropdown.Item as={Link} to='/skills'> Skills </Dropdown.Item>
                <Dropdown.Item as={Link} to='/community' > Community </Dropdown.Item>
                {Auth.loggedIn() ? (<>
                  <Dropdown.Item as={Link} to='/account/profile'>Profile</Dropdown.Item>
                  <Dropdown.Item as={Link} to='/account/content'> Content </Dropdown.Item>
                  <Dropdown.Item as={Link} to="/account/preferences" > Preferences </Dropdown.Item>
                  <Dropdown.Item onClick={Auth.logout}>Logout</Dropdown.Item>
                </>):(<>
                  <Dropdown.Item as={Link} to="/login" > Login </Dropdown.Item>
                </>)}
              </Dropdown.Menu>
            </Dropdown>
          </Menu.Menu>
          </>):(<>
          <Menu.Item as={Link} to='/'>
          <h1 className="nav-title" id="nav-title">The Backbeat</h1>
          </Menu.Item>
          <Menu.Item
            name='sounds'
            active={activeItem === 'sounds'}
            onClick={this.handleItemClick}
            as={Link} to='/sounds'
          />
          <Menu.Item
            name='skills'
            active={activeItem === 'skills'}
            onClick={this.handleItemClick}
            as={Link} to='/skills'
          />
          <Menu.Item
            name='community'
            active={activeItem === 'community'}
            onClick={this.handleItemClick}
            as={Link} to='/community'
          />

          {/*Right hand side of the menu*/}
          <Menu.Menu position='right'>
            {Auth.loggedIn() ? (
            <Dropdown item text='Account'>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to='/account/profile'>Profile</Dropdown.Item>
              <Dropdown.Item as={Link} to='/account/content'> Content </Dropdown.Item>
              <Dropdown.Item as={Link} to="/account/preferences" > Preferences </Dropdown.Item>
              <Dropdown.Item onClick={Auth.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>) : (
              <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
              as={Link} to='/login'
            />
            )}
          </Menu.Menu>
          </>)}
        </Menu>
      </div>
    )
  }
}
