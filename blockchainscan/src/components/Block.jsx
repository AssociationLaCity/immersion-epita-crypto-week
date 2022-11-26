import React from "react";
import { useParams, Link } from "react-router-dom";
import blocks from "../blocks.json";
import { Grid, Table, Message } from "semantic-ui-react";

export default function Block() {
  const { hash } = useParams();
  const [block, setBlock] = React.useState({});
  const [date, setDate] = React.useState(new Date());

  React.useEffect(() => {
    const block = blocks.find((block) => block.hash === hash);
    if (block) {
      setBlock(block);
      setDate(new Date(block.date * 1000));
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
            <Table.Cell>Block hash:</Table.Cell>
            <Table.Cell>{hash}</Table.Cell>
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
          <Table.Row>
            <Table.Cell>Transactions:</Table.Cell>
            <Table.Cell>
              {block.transactions &&
                block.transactions.map((tx) => (
                  <span>
                    <Link to={`/transaction/${tx.hash}`}>{tx.hash}</Link>
                    <br />
                  </span>
                ))}
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </Grid>
  );
}
