import React from "react";
import { Header, Statistic, Grid, Segment, Image } from "semantic-ui-react";

const ShowMetrics = () => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment>
              <Header>Viewability</Header>
            </Segment>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Statistic.Group size="mini">
                      <Statistic>
                        <Statistic.Label>spots</Statistic.Label>
                        <Statistic.Value>5</Statistic.Value>
                        <br />
                        <Statistic.Label>seen</Statistic.Label>
                        <Statistic.Value>95%</Statistic.Value>
                        <br />
                        <Statistic.Label>skipped</Statistic.Label>
                        <Statistic.Value>13%</Statistic.Value>
                      </Statistic>
                    </Statistic.Group>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Image src="./chart.png"></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>What is Viewability ></Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment.Group>
            <Segment>
              <Header>Impressions</Header>
            </Segment>
            <Segment>
              <Statistic size="mini">
                <Statistic.Label>per thousand</Statistic.Label>
                <Statistic.Value>200</Statistic.Value>
              </Statistic>
            </Segment>
          </Segment.Group>
          <Segment.Group>
            <Segment>
              <Header>Placement</Header>
            </Segment>
            <Segment>
              <Statistic size="mini">
                <Statistic.Label>per episode</Statistic.Label>
                <Statistic.Value>5</Statistic.Value>
              </Statistic>
            </Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={5}>
          <Segment.Group>
            <Segment>
              <Header>Abandonment</Header>
            </Segment>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Statistic.Group size="mini">
                      <Statistic>
                        <Statistic.Label>first 30%</Statistic.Label>
                        <Statistic.Value>10%</Statistic.Value>
                        <br />
                        <Statistic.Label>second 30%</Statistic.Label>
                        <Statistic.Value>13%</Statistic.Value>
                        <br />
                        <Statistic.Label>last 30%</Statistic.Label>
                        <Statistic.Value>9%</Statistic.Value>
                      </Statistic>
                    </Statistic.Group>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Image src="./chart.png"></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>What is Abandonment ></Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column width={6}>
          <Segment.Group>
            <Segment>
              <Header>Quality</Header>
            </Segment>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={6}>
                    <Statistic.Group size="mini">
                      <Statistic>
                        <Statistic.Label>8k</Statistic.Label>
                        <Statistic.Value>62%</Statistic.Value>
                        <br />
                        <Statistic.Label>4k</Statistic.Label>
                        <Statistic.Value>18%</Statistic.Value>
                        <br />
                        <Statistic.Label>HD</Statistic.Label>
                        <Statistic.Value>9%</Statistic.Value>
                      </Statistic>
                    </Statistic.Group>
                  </Grid.Column>
                  <Grid.Column width={10}>
                    <Image src="./chart.png"></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>What is Frequency ></Segment>
          </Segment.Group>
        </Grid.Column>
        <Grid.Column width={10}>
          <Segment.Group>
            <Segment>
              <Header>Reach</Header>
            </Segment>
            <Segment>
              <Grid>
                <Grid.Row>
                  <Grid.Column width={4}>
                    <Statistic.Group size="mini">
                      <Statistic>
                        <Statistic.Label>Unique viewers</Statistic.Label>
                        <Statistic.Value>62</Statistic.Value>
                        <br />
                        <Statistic.Label>Segment 1</Statistic.Label>
                        <Statistic.Value>18%</Statistic.Value>
                        <br />
                        <Statistic.Label>Segment 2</Statistic.Label>
                        <Statistic.Value>9%</Statistic.Value>
                      </Statistic>
                    </Statistic.Group>
                  </Grid.Column>
                  <Grid.Column width={12}>
                    <Image src="./map.png"></Image>
                  </Grid.Column>
                </Grid.Row>
              </Grid>
            </Segment>
            <Segment>What is Reach ></Segment>
          </Segment.Group>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ShowMetrics;
