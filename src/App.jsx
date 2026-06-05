import { useState, useMemo } from "react";
import ordersData from "./data/orders.json";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import OrderList from "./components/OrderList";
import OrderDetail from "./components/OrderDetail";
import { Search, ChevronDown, Download, Trash2, Plus } from "lucide-react";

const STATES = [...new Set(ordersData.orders.map((o) => o.state))];
const ORDER_TYPES = [...new Set(ordersData.orders.map((o) => o.orderType))];
const STATUSES = [...new Set(ordersData.orders.map((o) => o.status))];
const PAYMENT_STATUSES = [
  ...new Set(ordersData.orders.map((o) => o.paymentStatus)),
];

function FilterSelect({ value, onChange, placeholder, options }) {
  return (
    <div className="relative">
      <select
        className="appearance-none border border-gray-200 rounded-md bg-white text-gray-600 outline-none cursor-pointer"
        style={{
          paddingLeft: "12px",
          paddingRight: "32px",
          height: "38px",
          fontSize: "13px",
          minWidth: "160px",
        }}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={13}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
      />
    </div>
  );
}

export default function App() {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPayment, setFilterPayment] = useState("");
  const [applied, setApplied] = useState({});

  const handleFilter = () =>
    setApplied({ filterState, filterType, filterStatus, filterPayment });

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
      return (
        (!q ||
          o.id.includes(q) ||
          o.company.toLowerCase().includes(q) ||
          o.orderType.toLowerCase().includes(q) ||
          o.state.toLowerCase().includes(q)) &&
        (!applied.filterState || o.state === applied.filterState) &&
        (!applied.filterType || o.orderType === applied.filterType) &&
        (!applied.filterStatus || o.status === applied.filterStatus) &&
        (!applied.filterPayment || o.paymentStatus === applied.filterPayment)
      );
    });
  }, [search, applied]);

  return (
    <div
      className="min-h-screen bg-gray-50"
      style={{ fontFamily: "'Segoe UI', sans-serif" }}
    >
      <Navbar />
      <Sidebar />

      <div
        style={{
          marginLeft: "92px",
          marginTop: "84px",
          padding: "20px 32px 32px 0",
          height: "calc(100vh - 84px)",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          backgroundColor: "#f4f7fa",
          overflow: "auto"
        }}
      >
        {/* HEADER PANEL */}
        <div className="flex items-start justify-between flex-shrink-0 px-1">
          <div>
            <h1
              style={{ fontSize: "28px", fontWeight: "800", color: "#111827", letterSpacing: "-0.8px" }}
            >
              Orders
            </h1>
            <p style={{ fontSize: "14px", color: "#9ca3af", marginTop: "2px", fontWeight: "600" }}>
              Manage all your orders here
            </p>
          </div>
          <div className="flex gap-2.5">
            <button
              className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition font-bold shadow-sm"
              style={{ padding: "0 22px", height: "44px", fontSize: "14px" }}
            >
              <Plus size={16} strokeWidth={3} /> Create Order
            </button>
            <button
              className="flex items-center gap-2 bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition font-bold shadow-sm"
              style={{ padding: "0 24px", height: "44px", fontSize: "14px" }}
            >
              <Download size={16} strokeWidth={2.5} /> Export CSV
            </button>
            <button
              className="flex items-center gap-2 border border-gray-200 bg-white text-gray-700 rounded-lg hover:bg-gray-50 transition font-bold shadow-sm"
              style={{ padding: "0 22px", height: "44px", fontSize: "14px" }}
            >
              <Trash2 size={16} strokeWidth={2.5} /> Delete All Drafts
            </button>
          </div>
        </div>

        {/* FILTER BAR PANEL */}
        <div className="flex flex-wrap gap-2.5 items-center flex-shrink-0 px-1">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              className="border border-gray-200 rounded-[10px] bg-white outline-none focus:border-blue-400 transition-all shadow-sm"
              style={{
                paddingLeft: "42px",
                paddingRight: "16px",
                height: "46px",
                fontSize: "14px",
                width: "240px",
              }}
              placeholder="Search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <FilterSelect
            value={filterState}
            onChange={setFilterState}
            placeholder="Filter By State"
            options={STATES}
          />
          <FilterSelect
            value={filterType}
            onChange={setFilterType}
            placeholder="Filter By Order Type"
            options={ORDER_TYPES}
          />
          <FilterSelect
            value={filterStatus}
            onChange={setFilterStatus}
            placeholder="Filter By Status"
            options={STATUSES}
          />
          <FilterSelect
            value={filterPayment}
            onChange={setFilterPayment}
            placeholder="Filter By Payment Status"
            options={PAYMENT_STATUSES}
          />
          <button
            onClick={handleFilter}
            className="bg-[#2563eb] text-white rounded-lg hover:bg-blue-700 transition font-extrabold shadow-sm ml-1"
            style={{ padding: "0 32px", height: "46px", fontSize: "14px", letterSpacing: "0.2px" }}
          >
            Filter
          </button>
          <button
            onClick={handleClear}
            className="text-[#6b7280] hover:text-gray-900 transition font-bold px-4"
            style={{ fontSize: "14px" }}
          >
            Clear
          </button>
        </div>

        {/* MAIN COLUMNS PANEL */}
        <div className="flex gap-4 flex-1 min-h-0 pb-4">
          <OrderList
            orders={filtered}
            selectedOrder={selectedOrder}
            onSelectOrder={setSelectedOrder}
          />
          <OrderDetail order={selectedOrder} />
        </div>
      </div>
    </div>
  );
}
