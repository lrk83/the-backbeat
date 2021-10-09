import React, { Component, useState } from 'react';
import {Menu, Dropdown} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import Auth from '../utils/auth';

export default class AppNavbar extends Component {
  
  //Navbar active item
  state = { activeItem: '' }
  handleItemClick = (e, { name }) => this.setState({ activeItem: name })
  render() {
    const { activeItem } = this.state

    return (
      <div className="big-nav">
        <Menu secondary>
          <Menu.Item as={Link} to='/'>
          <h1 className="nav-title" id="nav-title">The Backbeat</h1>
          </Menu.Item>
          <Menu.Item
            name='skills'
            active={activeItem === 'skills'}
            onClick={this.handleItemClick}
            as={Link} to='/skills'
          />
          <Menu.Item
            name='sounds'
            active={activeItem === 'sounds'}
            onClick={this.handleItemClick}
            as={Link} to='/sounds'
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
        </Menu>
      </div>
    )
  }
}
