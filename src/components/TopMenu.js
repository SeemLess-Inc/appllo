import React from "react";
import { Link } from "react-router-dom";
import { Menu, Icon, Image } from "semantic-ui-react";

/* eslint-disable */
const TopMenu = () => (
  <Menu secondary>
    <Menu.Menu position="left">
      <Image as={Link} to="/"
        src="seemless_logo_red.png"
        alt="Seemless.tv"
        height="35px"
        width="200px"
      />
    </Menu.Menu>
    <Menu.Menu position="center">
      <Menu.Item fitted as={Link} to="/dashboard">
        Dashboard
      </Menu.Item>
      <Menu.Item>|</Menu.Item>
      <Menu.Item fitted as={Link} to="/edit">
        Ad Editor
      </Menu.Item>
      <Menu.Item>|</Menu.Item>
      <Menu.Item fitted as={Link} to="/editorDemo">
        Framer Demo
      </Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Menu.Item fitted>
        <Icon name="cog" size="large" color="grey" />
      </Menu.Item>
      <Menu.Item fitted>
        <Icon name="user circle outline" size="large" color="grey" />
      </Menu.Item>
    </Menu.Menu>
  </Menu>
);

export default TopMenu;
