import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <div
      className="fixed top-3 left-3 right-3 z-50 bg-white shadow-lg rounded-xl border border-gray-100 flex items-center justify-between px-8"
      style={{ height: "64px" }}
    >
      {/* LOGO */}
      <div className="flex items-center gap-2">
        <svg
          viewBox="0 0 38 38"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
        >
          <path
            d="M8 20 L16 28 L30 10"
            stroke="#2563eb"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="flex flex-col leading-none">
          <span
            style={{
              fontSize: "20px",
              fontWeight: "900",
              color: "#1d4ed8",
              letterSpacing: "-0.5px",
            }}
          >
            vState
          </span>
          <span
            style={{
              fontSize: "9px",
              fontWeight: "700",
              color: "#9ca3af",
              letterSpacing: "2px",
            }}
          >
            FILINGS
          </span>
        </div>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-1.5 cursor-pointer text-sm text-gray-700 font-semibold">
          RedBeryl Tech <ChevronDown size={14} className="text-gray-400" />
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[13px] font-bold text-[#2563eb]">
            Welcome, Nandkumar Rawate
          </span>
          <div
            className="rounded-full text-white flex items-center justify-center font-bold text-xs"
            style={{ width: "34px", height: "34px", backgroundColor: "#7c3aed" }}
          >
            NR
          </div>
        </div>
      </div>
    </div>
  );
}
