import React from "react";
import { Link } from "react-router-dom";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

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
        <Icon name="cog" />
      </Menu.Item>
      <Dropdown item icon="user circle outline" simple direction="left">
        <Dropdown.Menu>
          <Dropdown.Item>Menu item</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Menu>
  </Menu>
);

export default TopMenu;
