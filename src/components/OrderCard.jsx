export default function OrderCard({ order, isActive, onClick }) {
  return (
    <div
      className={`order-card ${isActive ? "active" : ""}`}
      onClick={() => onClick(order)}
    >
      <div className="order-card-id">ORDER-ID {order.id}</div>
      <div className="order-card-company">{order.company}</div>
      <div className="order-card-meta">
        <div>
          <strong>Order Type:</strong> {order.orderType}
        </div>
        <div className="order-card-meta-row">
          <span>
            <strong>State:</strong> {order.state}
          </span>
          <span className={`badge badge-${order.status}`}>{order.status}</span>
        </div>
        <div>{order.orderDate}</div>
      </div>
    </div>
  );
}
