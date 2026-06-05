const badgeStyles = {
  DRAFT: {
    background: "#f3f4f6",
    color: "#6b7280",
    border: "1px solid #e5e7eb",
  },
  COMPLETED: { background: "#ecfdf5", color: "#10b981", border: "none" },
  PENDING: { background: "#fffbeb", color: "#f59e0b", border: "none" },
  PROCESSING: { background: "#eff6ff", color: "#3b82f6", border: "none" },
  CANCELLED: { background: "#fef2f2", color: "#ef4444", border: "none" },
};

export default function OrderCard({ order, isActive, onClick }) {
  const badge = badgeStyles[order.status] || badgeStyles.DRAFT;

  return (
    <div
      onClick={() => onClick(order)}
      style={{
        padding: "20px 24px",
        borderBottom: "1px solid #f9fafb",
        backgroundColor: isActive ? "#eff6ff" : "transparent",
        cursor: "pointer",
        transition: "all 0.2s ease",
      }}
    >
      <div className="flex justify-between items-start mb-1.5">
        <div
          style={{
            fontSize: "14px",
            fontWeight: "800",
            color: "#111827",
          }}
        >
          ORDER-ID {order.id}
        </div>
        <div style={{ fontSize: "11px", color: "#9ca3af", fontWeight: "600" }}>
          {order.orderDate}
        </div>
      </div>

      <div style={{ fontSize: "13px", color: "#6b7280", fontWeight: "500", marginBottom: "12px" }}>
        {order.company}
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        <div style={{ fontSize: "13px", color: "#111827" }}>
          <span style={{ color: "#6b7280", fontWeight: "500" }}>Order Type:</span> <span style={{ fontWeight: "700" }}>{order.orderType}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyIn: "space-between", justifyContent: "space-between" }}>
          <div style={{ fontSize: "13px", color: "#111827" }}>
            <span style={{ color: "#6b7280", fontWeight: "500" }}>State:</span> <span style={{ fontWeight: "700" }}>{order.state}</span>
          </div>
          <span
            style={{
              ...badge,
              fontSize: "10px",
              fontWeight: "700",
              padding: "3px 10px",
              borderRadius: "5px",
              letterSpacing: "0.2px"
            }}
          >
            {order.status}
          </span>
        </div>
      </div>
    </div>
  );
}
