import React, { Component } from "react";
import { Table, Label } from "semantic-ui-react";

import transactions from "../../transactions.json";

import { Link } from "react-router-dom";

class LatestTxs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      transactions: [],
    };
  }

  componentDidMount = () => {
    this.getTxs();
  };

  getTxs = async () => {
    let txsDetails = [];
    if (transactions) {
      for (let i = 0; i < Math.min(10, transactions.length); i = i + 1) {
        const tx = transactions[transactions.length - i - 1];
        txsDetails.push(
          <Table.Row key={i}>
            <Table.Cell>
              <Label color="blue">Tx</Label>{" "}
              <Link to={"/transaction/" + tx.hash}>{tx.hash}</Link>
            </Table.Cell>
            <Table.Cell>
              From {tx.sender ?? "null"} <br></br>
              To {tx.receiver ?? "null"}
            </Table.Cell>
            <Table.Cell>
              {" "}
              <Label color="blue">Value</Label>{" "}
              {parseFloat(tx.amount).toFixed(2)}
            </Table.Cell>
          </Table.Row>
        );
      }
    }

    this.setState({
      transactions: txsDetails,
    });
  };

  render() {
    return (
      <div>
        <Table fixed>
          <Table.Header>
            <Table.Row>
              <Table.Cell style={{ color: "#1d6fa5" }}>
                <h4> Latest Transactions</h4>
              </Table.Cell>
            </Table.Row>
          </Table.Header>

          <Table.Body>{this.state.transactions}</Table.Body>
        </Table>
      </div>
    );
  }
}

export default LatestTxs;
