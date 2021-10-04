import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuTabular extends Component {
  state = { activeItem: 'login'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu tabular>
        <Menu.Item
          name='login'
          active={activeItem === 'login'}
          onClick={this.handleItemClick}
          as={Link} to='/login'
        />
        <Menu.Item
          name='signup'
          active={activeItem === 'signup'}
          onClick={this.handleItemClick}
          as={Link} to='/signup'
        />
      </Menu>
    )
  }
}
