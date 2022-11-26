import React, { Component } from "react";
import "./eth-overview.css";
import { Grid } from "semantic-ui-react";
import LatestBlocks from "../Latest-Blocks/index";
import LatestTxs from "../Latest-Txs/index";

class EthOverview extends Component {
  getLatestBlocks = () => {
    return <LatestBlocks latestBlock={null}></LatestBlocks>;
  };

  getLatestTxs = () => {
    return <LatestTxs blockNo={null}></LatestTxs>;
  };

  render() {
    return (
      <div>
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>{this.getLatestBlocks()}</Grid.Column>
            <Grid.Column>{this.getLatestTxs()}</Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    );
  }
}

export default EthOverview;
