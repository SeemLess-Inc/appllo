import * as React from "react";
import { Container, Message } from "semantic-ui-react";

export default () => (
  <Container fluid={true}>
    <Message
      color="red"
      icon="warning sign"
      header="Error: 404"
      content="Page Not Found"
    />
  </Container>
);
