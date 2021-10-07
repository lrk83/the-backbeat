import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom';

export default class MenuTabular extends Component {
  state = { activeItem: 'skill'}

  handleItemClick = (e, { name }) => this.setState({ activeItem: name })

  render() {
    const { activeItem } = this.state

    return (
      <Menu tabular>
        <Menu.Item
          name='sound'
          active={activeItem === 'sound'}
          onClick={this.handleItemClick}
          as={Link} to='/account/sounds/new-sound'
        />
        <Menu.Item
          name='skill'
          active={activeItem === 'skill'}
          onClick={this.handleItemClick}
          as={Link} to='/account/skills/new-skill'
        />
      </Menu>
    )
  }
}
