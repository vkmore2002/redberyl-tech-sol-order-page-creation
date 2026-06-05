import { useState } from "react";
import OrderCard from "./OrderCard";
import { ChevronDown } from "lucide-react";

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
    <div
      className="bg-white rounded-xl border border-gray-200 flex flex-col overflow-hidden flex-shrink-0"
      style={{ width: "340px" }}
    >
      {/* HEADER */}
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 flex-shrink-0">
        <div className="flex items-center gap-3">
          <span
            style={{ fontSize: "17px", fontWeight: "800", color: "#111827", letterSpacing: "-0.5px" }}
          >
            Orders
          </span>
          <span
            className="rounded-full flex items-center justify-center font-bold"
            style={{
              backgroundColor: "#dbeafe",
              color: "#2563eb",
              minWidth: "22px",
              height: "22px",
              fontSize: "11px",
              padding: "0 6px",
            }}
          >
            {orders.length}
          </span>
        </div>
        <div className="relative">
          <select
            className="appearance-none border border-gray-200 rounded-[10px] bg-white text-gray-400 outline-none cursor-pointer"
            style={{
              paddingLeft: "12px",
              paddingRight: "32px",
              height: "38px",
              fontSize: "13px",
              minWidth: "150px"
            }}
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            {SORT_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* LIST */}
      <div className="overflow-y-auto flex-1">
        {sorted.length === 0 ? (
          <div className="text-center text-sm text-gray-400 py-10">
            No orders found.
          </div>
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
