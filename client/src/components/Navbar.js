import React, { Component, useState } from 'react';
import {Menu, Dropdown} from "semantic-ui-react";
import { Link } from 'react-router-dom';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

export default class MenuExampleSecondary extends Component {
  state = { activeItem: '' }

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <div className="big-nav">
        <Menu secondary>
          <Menu.Item>
          <h1 className="nav-title" id="nav-title">The Backbeat</h1>
            </Menu.Item>
          <Menu.Item
            name='skills'
            active={activeItem === 'skills'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='sounds'
            active={activeItem === 'sounds'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='community'
            active={activeItem === 'community'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            {Auth.loggedIn() ? (
            <Dropdown item text='Categories'>
            <Dropdown.Menu>
              <Dropdown.Item>Account</Dropdown.Item>
              <Dropdown.Item>Friends</Dropdown.Item>
              <Dropdown.Item>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>) : (
              <Menu.Item
              name='login'
              active={activeItem === 'login'}
              onClick={this.handleItemClick}
            />
            )}
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
