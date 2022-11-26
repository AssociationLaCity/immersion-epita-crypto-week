import React from "react";
import { Header } from "semantic-ui-react";
import { Link} from "react-router-dom";
import "./header.css";

function AppDashboard() {
  return (
    <div>
      <Header as="h2" block>
        <Link to="/">LaCityScan</Link>
      </Header>
    </div>
  );
}

export default AppDashboard;
