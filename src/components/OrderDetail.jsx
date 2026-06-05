import { Printer, Phone, Mail, CheckCircle } from "lucide-react";

const TABS = [
  "Order Details",
  "Order Preview",
  "Company Details",
  "Documents",
  "Communication History",
  "Invoice",
  "Sales Receipt",
];

function getTotal(receipt) {
  return receipt.reduce((sum, i) => sum + i.amount, 0).toFixed(2);
}

export default function OrderDetail({ order }) {
  if (!order) {
    return (
      <div className="order-detail-panel">
        <div className="empty-state">
          <p>Select an order to view details</p>
        </div>
      </div>
    );
  }

  return (
    <div className="order-detail-panel">
      {/* HEADER */}
      <div className="detail-header">
        <div className="detail-header-left">
          <h2>ORDER-ID {order.id}</h2>
          <p>RedBeryl Tech</p>
        </div>
        <button className="btn">
          <Printer size={14} /> Print
        </button>
      </div>

      {/* INFO GRID */}
      <div className="info-grid-wrap">
        <div className="info-grid">
          <div className="info-field">
            <label>Order Type</label>
            <span>{order.orderType}</span>
          </div>
          <div className="info-field">
            <label>Entity Type</label>
            <span>{order.entityType}</span>
          </div>
          <div className="info-field">
            <label>Entity Name</label>
            <span>{order.entityName}</span>
          </div>
          <div className="info-field">
            <label>Order Date</label>
            <span>{order.orderDate}</span>
          </div>
          <div className="info-field">
            <label>Completion Date</label>
            <span>{order.completionDate || "—"}</span>
          </div>
          <div className="info-field">
            <label>State</label>
            <span>{order.state}</span>
          </div>
          <div className="info-field">
            <label>Order Placed By</label>
            <span>{order.orderPlacedBy}</span>
          </div>
          <div className="info-field">
            <label>Account Manager</label>
            <span>{order.accountManager}</span>
          </div>
        </div>

        {/* CONTACT CARD */}
        <div className="contact-card">
          <div className="contact-card-top">
            <div className="avatar">NR</div>
            <span>{order.accountManager}</span>
          </div>
          <div className="contact-row">
            <Phone size={13} /> {order.phone}
          </div>
          <div className="contact-row">
            <Mail size={13} /> {order.email}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div className="tabs-bar">
        {TABS.map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${tab === "Order Details" ? "active" : ""}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* TAB CONTENT */}
      <div className="tab-content">
        <div className="tab-content-grid">
          {/* RECEIPT */}
          <div className="receipt-box">
            <div className="receipt-box-header">Receipt</div>
            <div className="receipt-box-body">
              {order.receipt.map((item, i) => (
                <div className="receipt-item" key={i}>
                  <div>
                    <div className="receipt-item-name">{item.item}</div>
                    <div className="receipt-item-desc">
                      The filing fee as per the state selected Government fee
                    </div>
                  </div>
                  <div className="receipt-item-amount">
                    ${item.amount.toFixed(2)}
                  </div>
                </div>
              ))}
              <div className="receipt-total">
                <span>Total</span>
                <span>${getTotal(order.receipt)}</span>
              </div>
            </div>
          </div>

          {/* ORDER HISTORY */}
          <div className="history-box">
            <div className="history-box-header">Order History</div>
            <div className="history-box-body">
              {order.orderHistory.map((h, i) => (
                <div className="history-item" key={i}>
                  <div className="history-icon">
                    <CheckCircle size={13} />
                  </div>
                  <div className="history-body">
                    <div className="history-status">{h.status}</div>
                    <div className="history-desc">{h.description}</div>
                    <div className="history-meta">Updated by {h.updatedBy}</div>
                  </div>
                  <div className="history-date">{h.date}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
