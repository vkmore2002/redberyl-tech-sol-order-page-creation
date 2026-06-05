import { useState } from "react";
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
  const [activeTab, setActiveTab] = useState("Order Details");

  if (!order) {
    return (
      <div className="flex-1 bg-white rounded-xl border border-gray-200 flex items-center justify-center text-gray-400 text-sm">
        Select an order to view details
      </div>
    );
  }

  return (
    <div className="flex-1 bg-white flex flex-col min-w-0 rounded-xl border border-gray-200 shadow-sm h-fit">
      {/* HEADER SECTION - More padding */}
      <div className="flex items-start justify-between px-8 py-7 flex-shrink-0">
        <div>
          <div style={{ fontSize: "16px", fontWeight: "800", color: "#111827", marginBottom: "2px", letterSpacing: "-0.2px" }}>
            ORDER-ID
          </div>
          <div style={{ fontSize: "13px", color: "#9ca3af", fontWeight: "600" }}>
            RedBeryl Tech
          </div>
        </div>
        <button
          className="flex items-center gap-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition shadow-sm"
          style={{ padding: "8px 16px", fontSize: "13px", fontWeight: "600" }}
        >
          <Printer size={15} /> Print
        </button>
      </div>

      {/* TOP INFO GRID + CONTACT CARD - Indented with more padding */}
      <div className="flex gap-4 px-8 pb-8 flex-shrink-0">
        <div className="flex-1 border border-gray-200 rounded-[16px] p-10 bg-white">
          <div className="grid grid-cols-4 gap-y-12 gap-x-6">
            {[
              { label: "Order Type", value: order.orderType },
              { label: "Entity Type", value: order.entityType },
              { label: "Entity Name", value: order.entityName },
              { label: "Order Date", value: order.orderDate },
              { label: "Completion Date", value: order.completionDate || "—" },
              { label: "State", value: order.state },
              { label: "Order Placed By", value: order.orderPlacedBy || "—" },
              { label: "Account Manager", value: order.accountManager || "—" },
            ].map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: "13px", color: "#111827", fontWeight: "700", marginBottom: "14px" }}>
                  {label}
                </div>
                <div style={{ fontSize: "14px", color: "#6b7280", fontWeight: "500" }}>
                  {value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT BOX */}
        <div className="w-[290px] border border-gray-200 rounded-[16px] p-7 flex flex-col bg-white">
           <div className="flex items-center gap-4 mb-5">
              <div 
                className="rounded-full flex items-center justify-center text-white font-bold"
                style={{ width: "42px", height: "42px", backgroundColor: "#7839ee", fontSize: "13px" }}
              >
                NR
              </div>
              <div style={{ fontSize: "15px", fontWeight: "800", color: "#111827" }}>Nandkumar rawate</div>
           </div>
           {/* Separator line */}
           <div className="w-full h-px bg-gray-100 mb-6"></div>
           <div className="flex flex-col gap-5">
              <div className="flex items-center gap-3 text-[#111827]" style={{ fontSize: "14px", fontWeight: "500" }}>
                <Phone size={16} className="text-[#3b82f6]" strokeWidth={2.5} /> 9836742169
              </div>
              <div className="flex items-center gap-3 text-[#111827]" style={{ fontSize: "14px", fontWeight: "500" }}>
                <Mail size={16} className="text-[#3b82f6]" strokeWidth={2.5} /> 
                <span className="truncate">nandkumar@redberyl.com</span>
              </div>
           </div>
        </div>
      </div>

      {/* TABS ROW */}
      <div className="flex items-center px-8 border-t border-b border-gray-100 bg-white" style={{ height: "54px", gap: "28px" }}>
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: activeTab === tab ? "4px 16px" : "4px 0",
              fontSize: "14px",
              fontWeight: activeTab === tab ? "800" : "600",
              color: activeTab === tab ? "#2563eb" : "#6b7280",
              borderBottom: activeTab === tab ? "2.5px solid #2563eb" : "2.5px solid transparent",
              background: "transparent",
              borderRadius: "0",
              cursor: "pointer",
              whiteSpace: "nowrap",
              height: "100%",
              transition: "all 0.2s ease"
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* CONTENT AREA */}
      <div className="p-8 bg-white overflow-visible">
        {activeTab === "Order Details" && (
          <div className="grid grid-cols-2 gap-6 items-start">
            {/* RECEIPT CARD */}
            <div className="border border-[#bfdbfe] rounded-xl overflow-hidden shadow-sm">
              <div style={{ backgroundColor: "#f0f7ff", borderBottom: "1px solid #bfdbfe", padding: "12px 16px" }}>
                <span style={{ fontSize: "14px", fontWeight: "700", color: "#2563eb" }}>Receipt</span>
              </div>
              <div style={{ padding: "0 16px" }}>
                {order.receipt.map((item, i) => (
                  <div key={i} className="flex justify-between items-start py-5 border-b border-gray-100 last:border-0">
                    <div className="flex-1 pr-10">
                      <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827", marginBottom: "4px" }}>{item.item}</div>
                      <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.5" }}>The filing fee for the application as per the state selected Government fee</div>
                    </div>
                    <div style={{ fontSize: "14px", fontWeight: "700", color: "#111827" }}>${item.amount.toFixed(2)}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* ORDER HISTORY CARD */}
            <div className="border border-[#bfdbfe] rounded-xl overflow-hidden shadow-sm">
               <div style={{ backgroundColor: "#f0f7ff", borderBottom: "1px solid #bfdbfe", padding: "12px 16px" }}>
                 <span style={{ fontSize: "14px", fontWeight: "700", color: "#2563eb" }}>Order History</span>
               </div>
               <div style={{ padding: "0 16px" }}>
                 {order.orderHistory.map((h, i) => (
                   <div key={i} className="flex gap-3 py-5 border-b border-gray-100 last:border-0">
                      <div className="mt-1">
                        <CheckCircle size={16} className="text-green-500" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between mb-1.5 px-0.5">
                          <span style={{ fontSize: "13px", fontWeight: "800", color: "#111827" }}>{h.status}</span>
                          <span style={{ fontSize: "12px", color: "#111827", fontWeight: "700" }}>{h.date}</span>
                        </div>
                        <div style={{ fontSize: "13px", color: "#6b7280", lineHeight: "1.5" }}>{h.description}</div>
                        <div style={{ fontSize: "12px", color: "#6b7280", marginTop: "6px" }}>
                          Updated by <span style={{ color: "#3b82f6", fontWeight: "600" }}>{h.updatedBy}</span>
                        </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
