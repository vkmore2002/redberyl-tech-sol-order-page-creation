import {
  LayoutDashboard,
  ShoppingBasket,
  Building2,
  Users,
  HelpCircle,
} from "lucide-react";

const items = [
  { icon: LayoutDashboard, label: "Dashboard" },
  { icon: ShoppingBasket, label: "Orders", active: true },
  { icon: Building2, label: "Companies" },
  { icon: Users, label: "Users" },
  { icon: HelpCircle, label: "Help" },
];

export default function Sidebar() {
  return (
    <div
      className="fixed left-3 top-20 bottom-4 z-40 bg-white shadow-lg rounded-xl border border-gray-100 flex flex-col items-center pt-5 gap-4"
      style={{ width: "74px" }}
    >
      {items.map(({ icon: Icon, label, active }) => (
        <div
          key={label}
          className={`flex flex-col items-center gap-1 cursor-pointer transition-all w-full
            ${active ? "text-blue-600" : "text-gray-400 hover:text-gray-600"}`}
        >
          <Icon size={22} strokeWidth={active ? 2.5 : 2} />
          <span
            style={{ fontSize: "10px", fontWeight: active ? "700" : "500" }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}
