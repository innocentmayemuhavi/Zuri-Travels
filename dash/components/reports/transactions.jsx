import { useContext } from "react";
import "./index.css";
import { FirebaseContext } from "../context/firebase";
const TransactionReports = () => {
  const { transactions } = useContext(FirebaseContext);
  const completedTransactions = transactions.filter(
    (data) => data.status === "Completed"
  );

  const pendingTransactions = transactions.filter(
    (data) => data.status === "Pending"
  );
  const amounts = completedTransactions.map(
    (transaction) => transaction.amount
  );
  const highestAmount = Math.max(...amounts);
  const lowestAmount = Math.min(...amounts);
  const renderCompletedTransactions = completedTransactions.map(
    (transaction, index) => {
      console.log();
      const date = transaction.timestamp.toDate();
      const formattedDate = date.toDateString();

      const hours = date.getHours();
      const minutes = date.getMinutes();
      const seconds = date.getSeconds();

      const formattedTime = `${hours}:${minutes}:${seconds}`;

      return (
        <tr key={index}>
          <td>{index + 1}</td>
          <td>{transaction.code}</td>
          <td>{parseInt(transaction.amount).toLocaleString()}</td>
          <td>{formattedDate}</td>
          <td>{formattedTime}</td>
          <td>{transaction.status}</td>
        </tr>
      );
    }
  );

  return (
    <main className="fade">
      <h3>Transactions Reports</h3>
      <table>
        <thead>
          <tr>
            <th>S/N</th>
            <th>Transaction Code</th>
            <th>Amount</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>{renderCompletedTransactions}</tbody>
      </table>
      <div>
        <h5>Highest Amount: Ksh.{highestAmount.toLocaleString()}</h5>
        <h5>Highest Amount: Ksh.{lowestAmount.toLocaleString()}</h5>
      </div>
      <button className="button" onClick={() => window.print()}>
        Print
      </button>
    </main>
  );
};

export default TransactionReports;
