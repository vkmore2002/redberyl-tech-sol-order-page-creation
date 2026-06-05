import { useState } from "react";
import OrderCard from "./OrderCard";

const SORT_OPTIONS = [
  { value: "", label: "Select a Field to Sort" },
  { value: "date", label: "Order Date" },
  { value: "status", label: "Status" },
  { value: "company", label: "Company Name" },
];

export default function OrderList({ orders, selectedOrder, onSelectOrder }) {
  const [sortBy, setSortBy] = useState("");

  const sorted = [...orders].sort((a, b) => {
    if (sortBy === "date") return new Date(b.orderDate) - new Date(a.orderDate);
    if (sortBy === "status") return a.status.localeCompare(b.status);
    if (sortBy === "company") return a.company.localeCompare(b.company);
    return 0;
  });

  return (
    <div className="order-list-panel">
      <div className="order-list-header">
        <div className="order-list-title">
          Orders
          <span className="count-badge">{orders.length}</span>
        </div>
        <select
          className="sort-select"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      <div className="order-list-scroll">
        {sorted.length === 0 ? (
          <div className="no-orders">No orders found.</div>
        ) : (
          sorted.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              isActive={selectedOrder?.id === order.id}
              onClick={onSelectOrder}
            />
          ))
        )}
      </div>
    </div>
  );
}
