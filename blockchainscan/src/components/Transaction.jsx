import React from "react";
import { useParams, Link } from "react-router-dom";
import transactions from "../transactions.json";
import { Grid, Table, Message } from "semantic-ui-react";

export default function Transaction() {
  const { hash } = useParams();
  const [blockHash, setBlockHash] = React.useState("");
  const [tx, setTx] = React.useState({});
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const tx = transactions.find((tx) => tx.hash === hash);
    if (tx) {
      setBlockHash(tx.blockHash);
      setTx(tx);
      setDate(new Date(tx.date * 1000));
    }
  }, [hash]);

  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);
    var interval = seconds / 31536000;
    if (interval > 1) {
      return Math.floor(interval) + " year" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return Math.floor(interval) + " month" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return Math.floor(interval) + " day" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return Math.floor(interval) + " hour" + (interval > 2 ? "s" : "");
    }
    interval = seconds / 60;
    if (interval > 1) {
      return Math.floor(interval) + " minute" + (interval > 2 ? "s" : "");
    }
    return Math.floor(seconds) + " second" + (interval > 2 ? "s" : "");
  }

  return (
    <Grid>
      <Table fixed>
        <Table.Header>
          <Table.Row>
            <Table.Cell style={{ color: "#1d6fa5" }}>
              <h4> Latest Transactions</h4>
            </Table.Cell>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          <Table.Row>
            <Table.Cell>Transaction hash:</Table.Cell>
            <Table.Cell>{hash}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Status:</Table.Cell>
            <Table.Cell>
              <Message positive>
                <Message.Header>Success</Message.Header>
              </Message>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Block:</Table.Cell>
            <Table.Cell>
              <Link to={"/block/" + blockHash}>{blockHash}</Link>
            </Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>Timestamp:</Table.Cell>
            <Table.Cell>
              {timeSince(date) +
                " ago (" +
                date?.toDateString() +
                " at " +
                date?.toLocaleTimeString() +
                ")"}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid>
  );
}
