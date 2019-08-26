import React from "react";
import { Menu, Dropdown, Icon } from "semantic-ui-react";

const TopMenu = () => (
  <Menu secondary>
    <Menu.Menu position="left">
      <Menu.Item fitted header as='h2'>Seemless.tv</Menu.Item>{" "}
    </Menu.Menu>
    <Menu.Menu position="center">
      <Menu.Item fitted>Dashboard</Menu.Item>
      <Menu.Item>|</Menu.Item>
      <Menu.Item fitted>Ad Editor</Menu.Item>
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
