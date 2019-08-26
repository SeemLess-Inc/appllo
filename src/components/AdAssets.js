import React from "react";
import { Icon, Grid, Menu, Divider } from "semantic-ui-react";

const AdAssets = () => (
  <Grid>
    <Grid.Row>
      <Grid.Column>
        <Menu secondary>
          <Menu.Item fitted header as="h3">
            Ad Assets
          </Menu.Item>
          <Menu.Menu position="right">
            <Icon size='large' name="plus circle" />
          </Menu.Menu>
        </Menu>
        <Divider />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);

export default AdAssets;
