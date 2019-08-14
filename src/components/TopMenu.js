import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

const TopMenu = () => (
  <Menu secondary>
    <Menu.Item header>Seemless.tv</Menu.Item>
    <Menu.Menu
      style={{
        justifyContent: "center"
      }}
    >
      <Menu.Item>Dashboard</Menu.Item>
      <Menu.Item>|</Menu.Item>
      <Menu.Item>Ad Editor</Menu.Item>
    </Menu.Menu>
    <Menu.Menu position="right">
      <Menu.Item>
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
