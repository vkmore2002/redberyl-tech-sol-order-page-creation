import { useState, useMemo } from "react";
import ordersData from "./data/orders.json";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";

const STATES = [...new Set(ordersData.orders.map((o) => o.state))];
const ORDER_TYPES = [...new Set(ordersData.orders.map((o) => o.orderType))];
const STATUSES = [...new Set(ordersData.orders.map((o) => o.status))];
const PAYMENT_STATUSES = [
  ...new Set(ordersData.orders.map((o) => o.paymentStatus)),
];

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [applied, setApplied] = useState({});

  const handleFilter = () => {
    setApplied({ filterState, filterType, filterStatus, filterPayment });
  };

  const handleClear = () => {
    setSearch("");
    setFilterState("");
    setFilterType("");
    setFilterStatus("");
    setFilterPayment("");
    setApplied({});
  };

  const filtered = useMemo(() => {
    return ordersData.orders.filter((o) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q) ||
        o.orderType.toLowerCase().includes(q) ||
        o.state.toLowerCase().includes(q);

      const matchState =
        !applied.filterState || o.state === applied.filterState;
      const matchType =
        !applied.filterType || o.orderType === applied.filterType;
      const matchStatus =
        !applied.filterStatus || o.status === applied.filterStatus;
      const matchPayment =
        !applied.filterPayment || o.paymentStatus === applied.filterPayment;

      return (
        matchSearch && matchState && matchType && matchStatus && matchPayment
      );
    });
  }, [search, applied]);

  return (
    <>
      <Navbar />
      <Sidebar />
      <div className="main-content">
        {/* PAGE HEADER */}
        <div className="page-header">
          <div className="page-title">
            <h1>Orders</h1>
            <p>Manage all your orders here</p>
          </div>
          <div className="header-actions">
            <button className="btn btn-primary">+ Create Order</button>
            <button className="btn">⬆ Export CSV</button>
            <button className="btn btn-danger">🗑 Delete All Drafts</button>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters-bar">
          <div className="search-input-wrap">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              className="search-input"
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <select
            className="filter-select"
            value={filterState}
            onChange={(e) => setFilterState(e.target.value)}
          >
            <option value="">Filter By State</option>
            {STATES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="">Filter By Order Type</option>
            {ORDER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="">Filter By Status</option>
            {STATUSES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <select
            className="filter-select"
            value={filterPayment}
            onChange={(e) => setFilterPayment(e.target.value)}
          >
            <option value="">Filter By Payment Status</option>
            {PAYMENT_STATUSES.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>

          <button className="btn btn-filter" onClick={handleFilter}>
            Filter
          </button>
          <button className="btn btn-clear" onClick={handleClear}>
            Clear
          </button>
        </div>

        {/* ORDERS LAYOUT */}
        <div className="orders-layout">
          <OrderList
            orders={filtered}
            selectedOrder={selectedOrder}
            onSelectOrder={setSelectedOrder}
          />
          <OrderDetail order={selectedOrder} />
        </div>
      </div>
    </>
  );
}
