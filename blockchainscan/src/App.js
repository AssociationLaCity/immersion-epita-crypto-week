import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';

import Header from "./components/Header/index";
import EthOverview from "./components/Eth-Overview/index";
import Transaction from "./components/Transaction";
import Block from './components/Block';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route exact path='/' element={<EthOverview />}></Route>
          <Route exact path='/transaction/:hash' element={< Transaction />}></Route>
          <Route exact path='/block/:hash' element={< Block />}></Route>
        </Routes>
        {/* <h1>Blockchain</h1>
      <h2>Transactions</h2>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.hash}>
            <div>Hash: {transaction.hash}</div>
            <div>From: {transaction.sender}</div>
            <div>To: {transaction.receiver}</div>
            <div>Amount: {transaction.amount}</div>
            <div>Date: {transaction.date}</div>
          </li>
        ))}
      </ul>
      <h2>Blocks</h2>
      <ul>
        {blocks.map((block) => (
          <li key={block.hash}>
            <div>Hash: {block.hash}</div>
            <div>Previous Hash: {block.previous_block}</div>
            <div>Transactions: {block.transactions.length}</div>
          </li>
        ))}
      </ul> */}
      </div>
    </Router>
  );
}

export default App;
