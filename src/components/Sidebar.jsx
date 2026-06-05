import {
  LayoutDashboard,
  ShoppingCart,
  Building2,
  Users,
  HelpCircle,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: ShoppingCart, label: "Orders", active: true },
  { icon: Building2, label: "Companies" },
  { icon: Users, label: "Users" },
  { icon: HelpCircle, label: "Help" },
];

export default function Sidebar() {
  return (
    <div className="sidebar">
      {items.map(({ icon: Icon, label, active }) => (
        <div key={label} className={`sidebar-item ${active ? "active" : ""}`}>
          <Icon />
          <span>{label}</span>
        </div>
      ))}
    </div>
  );
}
