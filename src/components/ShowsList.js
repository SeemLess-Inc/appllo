import React from "react";
import {
  Header,
  Grid,
  Icon,
  Divider,
  Accordion
} from "semantic-ui-react";
//import ShowItem from "./ShowItem";

class ShowsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: -1 };
  }

  handleClick = (e, titleProps) => {
    const { index } = titleProps;
    const { activeIndex } = this.state;
    const newIndex = activeIndex === index ? -1 : index;

    this.setState({ activeIndex: newIndex });
  };

  render() {
    const shows = [
      {
        id: 0,
        title: "Stranger Things",
        seasons: [
          {
            id: 0,
            title: "Season 1",
            episodes: [
              { id: 0, title: "Episode 1" },
              { id: 1, title: "Episode 2" },
              { id: 2, title: "Episode 3" },
              { id: 3, title: "Episode 4" },
              { id: 4, title: "Episode 5" },
              { id: 5, title: "Episode 6" }
            ]
          },
          {
            id: 1,
            title: "Season 2",
            episodes: [
              { id: 0, title: "Episode 1" },
              { id: 1, title: "Episode 2" },
              { id: 2, title: "Episode 3" },
              { id: 3, title: "Episode 4" },
              { id: 4, title: "Episode 5" },
              { id: 5, title: "Episode 6" }
            ]
          }
        ]
      },
      {
        id: 1,
        title: "13 Reasons Why",
        seasons: [
          {
            id: 0,
            title: "Season 1",
            episodes: [
              { id: 0, title: "Episode 1" },
              { id: 1, title: "Episode 2" },
              { id: 2, title: "Episode 3" },
              { id: 3, title: "Episode 4" },
              { id: 4, title: "Episode 5" },
              { id: 5, title: "Episode 6" }
            ]
          },
          {
            id: 1,
            title: "Season 2",
            episodes: [
              { id: 0, title: "Episode 1" },
              { id: 1, title: "Episode 2" },
              { id: 2, title: "Episode 3" },
              { id: 3, title: "Episode 4" },
              { id: 4, title: "Episode 5" },
              { id: 5, title: "Episode 6" }
            ]
          }
        ]
      },
      {
        id: 2,
        title: "Big Little Lies",
        seasons: [
          {
            id: 0,
            title: "Season 1",
            episodes: [
              { id: 0, title: "Episode 1" },
              { id: 1, title: "Episode 2" },
              { id: 2, title: "Episode 3" },
              { id: 3, title: "Episode 4" },
              { id: 4, title: "Episode 5" },
              { id: 5, title: "Episode 6" }
            ]
          },
          {
            id: 1,
            title: "Season 2",
            episodes: [
              { id: 0, title: "Episode 1" },
              { id: 1, title: "Episode 2" },
              { id: 2, title: "Episode 3" },
              { id: 3, title: "Episode 4" },
              { id: 4, title: "Episode 5" },
              { id: 5, title: "Episode 6" }
            ]
          }
        ]
      }
    ];

    const { activeIndex } = this.state;

    return (
      <Grid>
        <Grid.Row>
          <Grid.Column width={16}>
            <Header size="medium">Shows (3)</Header>
          </Grid.Column>
        </Grid.Row>
        <Divider />
        <Grid.Row style={{ margin: 14 }}>
          <Accordion>
            {shows.map(showData => {
              return (
                <Accordion.Accordion key={showData.id}>
                  <Accordion.Title
                    active={activeIndex === showData.id}
                    index={showData.id}
                    onClick={this.handleClick}
                  >
                    <Icon name="folder outline" />
                    {showData.title}
                  </Accordion.Title>
                  <Accordion.Content
                    seasonData={showData.seasons}
                    active={activeIndex === showData.id}
                  >
                    <p> Season Content</p>
                  </Accordion.Content>
                </Accordion.Accordion>
              );
            })}
          </Accordion>
        </Grid.Row>
      </Grid>
    );
  }
}

export default ShowsList;
