import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon } from "semantic-ui-react";

/* eslint-disable */
const TopMenu = () => (
  <Menu secondary>
    <Menu.Menu position="left">
      <Menu.Item fitted header as={Link} to="/">
        <h2>Seemless.tv</h2>
      </Menu.Item>{" "}
    </Menu.Menu>
    <Menu.Menu position="center">
      <Menu.Item fitted as={Link} to="/dashboard">
        Dashboard
      </Menu.Item>
      <Menu.Item>|</Menu.Item>
      <Menu.Item fitted as={Link} to="/edit">
        Ad Editor
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
    <Menu.Item fitted>
        <Icon name="cog" size='large' />
      </Menu.Item>
      <Menu.Item fitted>
        <Icon name="user circle outline" size='large' />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default TopMenu;
