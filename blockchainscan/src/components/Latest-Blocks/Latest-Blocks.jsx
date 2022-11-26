import React, { Component } from "react";
import { Table, Label } from "semantic-ui-react";
import { Link } from "react-router-dom";
import blocks from "../../blocks.json";

class LatestBlocks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blocks: [],
    };
  }

  componentDidMount = () => {
    this.getBlocks();
  };

  getBlocks = async () => {
    let blocksArray = [];

    if (blocks) {
      for (let i = 0; i < Math.min(10, blocks.length); i = i + 1) {
        const result = blocks[blocks.length - i - 1];
        blocksArray.push(
          <Table.Row key={i}>
            <Table.Cell>
              <Label color="blue">Block Nb</Label> {blocks.length - i - 1}
            </Table.Cell>
            <Table.Cell>
              Hash <Link to={"/block/" + result.hash}>{result.hash}</Link>{" "}
              <br></br>
              Txs {result.transactions.length}
            </Table.Cell>
            <Table.Cell>
              <Label color="blue">Size </Label>{" "}
              {result.transactions.length * 64} bytes
            </Table.Cell>
          </Table.Row>
        );

        this.setState({
          blocks: blocksArray,
        });
      }
    }
  };

  render() {
    return (
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.Cell style={{ color: "#1d6fa5" }}>
              <h4>Latest Blocks</h4>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>{this.state.blocks}</Table.Body>
      </Table>
    );
  }
}

export default LatestBlocks;
