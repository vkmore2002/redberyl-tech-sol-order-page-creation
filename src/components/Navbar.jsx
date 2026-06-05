import { ChevronDown } from "lucide-react";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-logo">
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <rect width="28" height="28" rx="6" fill="#1a73e8" />
          <text x="5" y="20" fill="white" fontSize="14" fontWeight="800">
            vS
          </text>
        </svg>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#1a73e8" }}>
            vState
          </div>
          <span>FILINGS</span>
        </div>
      </div>

      <div className="navbar-right">
        <div className="company-selector">
          RedBeryl Tech <ChevronDown size={14} />
        </div>
        <span className="welcome-text">Welcome, Nandkumar Rawate</span>
        <div className="avatar">NR</div>
      </div>
    </div>
  );
}
