import { useContext } from "react";
import { FirebaseContext } from "../context/firebase";
import { Header } from "../header";
import { useState } from "react";
import { AppContext } from "../context/appcontext";
import { ConfirmPayModal } from "../Modals";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";
import Nav from "../nav";
const Transactions = () => {
  const navigate = useNavigate();
  const { transactions } = useContext(FirebaseContext);
  const { showPayModal, setShowPayModal, setModalData } =
    useContext(AppContext);

  const [tab, setTab] = useState(0);

  const [filterData, setFilterData] = useState({
    startDate: "",
    endDate: "",
  });

  const [useFilter, setUseFilter] = useState(false);
  const completedTransactions = transactions.filter(
    (data) =>
      (!useFilter ||
        (new Date(data.timestamp.toDate()) >= new Date(filterData.startDate) &&
          new Date(data.timestamp.toDate()) <= new Date(filterData.endDate))) &&
      data.status === "Completed"
  );

  const pendingTransactions = transactions.filter(
    (data) =>
      (!useFilter ||
        (new Date(data.timestamp.toDate()) >= new Date(filterData.startDate) &&
          new Date(data.timestamp.toDate()) <= new Date(filterData.endDate))) &&
      data.status === "Pending"
  );

  const renderPendingTransactions = pendingTransactions.map(
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
          <td>{transaction.id}</td>
          <td>{parseInt(transaction.amount).toLocaleString()}</td>
          <td>{formattedDate}</td>
          <td>{formattedTime}</td>
          <td>{transaction.status}</td>
          <td
            onClick={() => {
              // updateTransaction(transaction.uid, transaction.id);

              setShowPayModal(true);
              setModalData(transaction);
            }}
          >
            Update
          </td>
        </tr>
      );
    }
  );

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
      <Header title="Transactions" hasback={true} />

      <div className="order-nav">
        <button
          style={{
            // backgroundColor: tab === 0 && "#21262d",
            // color: tab === 0 ? "white":'black',
            backgroundColor: "#21262d",
            border: tab === 0 && ` ${2}px solid white`,
          }}
          onClick={() => {
            setTab(0);
          }}
        >
          Pending
        </button>
        <button
          style={{
            backgroundColor: "#21262d",
            border: tab === 1 && ` ${2}px solid white`,
          }}
          onClick={() => {
            setTab(1);
          }}
        >
          Completed
        </button>
      </div>
      <div>
        <div>
          <h4>Filter</h4>
          <div className="page-input1">
            <label>Use Filter</label>
            <label className="switch">
              <input
                type="checkbox"
                checked={useFilter}
                onChange={(e) => setUseFilter(!useFilter)}
              />
              <span className="slider round"></span>
            </label>
          </div>
          <Link
            onClick={() =>
              setFilterData({
                startDate: "",
                endDate: "",
              })
            }
          >
            Clear FIlter
          </Link>
        </div>
        <div>
          <div className="page-input1">
            <label>From</label>
            <input
              type="date"
              value={filterData.startDate}
              onChange={(e) =>
                setFilterData({ ...filterData, startDate: e.target.value })
              }
            />
          </div>
          <div className="page-input1">
            <label>To:</label>
            <input
              type="date"
              value={filterData.endDate}
              onChange={(e) =>
                setFilterData({ ...filterData, endDate: e.target.value })
              }
            />
          </div>
        </div>
      </div>
      <div className="button_right">
        <button className="button" onClick={()=>navigate('/transactionsreports')}>Generate Report</button>
      </div>
      <div className="table-holder">
        {tab === 0 ? (
          <table>
            <thead>
              <th>SN</th>
              <th>ID</th>
              <th>Amount</th>
              <th>Date</th>
              <th>T-Init-Time</th>
              <th>Status</th>
            </thead>
            <tbody>{renderPendingTransactions}</tbody>
          </table>
        ) : (
          <table>
            <thead>
              <th>SN</th>
              <th>T-Code</th>
              <th>Amount</th>
              <th>Date</th>
              <th>T-Time</th>
              <th>Status</th>
            </thead>
            <tbody>{renderCompletedTransactions}</tbody>
          </table>
        )}
      </div>
      {showPayModal && <ConfirmPayModal />}
      <Nav />
    </main>
  );
};

export { Transactions };
