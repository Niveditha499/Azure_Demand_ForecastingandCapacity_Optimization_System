import { useState, useEffect } from "react";
import {
  BarChart3,
  FileText,
  ClipboardCheck,
  Menu,
  X,
  Activity,
  Gauge,
  Sparkles,
  Search,
  User,
  BrainCircuit,
} from "lucide-react";

export default function Sidebar({ onSelect }) {
  const [active, setActive] = useState("Dashboard");
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSelect = (page) => {
    setActive(page);
    if (onSelect) onSelect(page);
    if (window.innerWidth < 1024) setIsOpen(false);
  };

  const iconColorMap = {
    Dashboard: "text-[#225577] dark:text-orange-300",
    "Model Dashboard": "text-blue-500 dark:text-blue-300",
    "Usage Trends": "text-orange-500 dark:text-orange-300",
    Forecasts: "text-fuchsia-700 dark:text-fuchsia-400",
    Reports: "text-green-700 dark:text-green-400",
    Insights: "text-pink-500 dark:text-pink-400",
    "Multi-Region": "text-cyan-400 dark:text-cyan-300",
  };

  const bgActiveColorMap = {
    Dashboard: "from-[#b7d2f7] to-[#225577]",
    "Model Dashboard": "from-blue-300 to-blue-700",
    "Usage Trends": "from-orange-300 to-orange-500",
    Forecasts: "from-fuchsia-400 to-fuchsia-700",
    Reports: "from-green-300 to-green-700",
    Insights: "from-pink-400 to-pink-600",
    "Multi-Region": "from-cyan-300 to-cyan-700",
  };

  const menuItems = [
    { name: "Dashboard", icon: Gauge, badge: "Live" },
    { name: "Usage Trends", icon: BarChart3, badge: "7d" },
    { name: "Forecasts", icon: Activity, badge: "Beta" },
    { name: "Reports", icon: ClipboardCheck },
    { name: "Insights", icon: FileText },
    { name: "Model Dashboard", icon: BrainCircuit, badge: "New" },
    { name: "Multi-Region", icon: BarChart3, badge: "New" },
  ];

  const filteredMenuItems = menuItems.filter((item) => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return true;
    return item.name.toLowerCase().includes(term);
  });

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <>
      {/* Mobile Toggle */}
      <button
        className="lg:hidden fixed top-5 left-5 z-50 text-white bg-gradient-to-br 
         from-[#b7d2f7] to-[#225577] p-3 rounded-xl shadow-lg transition-all 
         duration-300 hover:scale-105"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* FIXED SIDEBAR */}
      <aside
        className={`
          group fixed top-0 left-0 h-screen
          w-72 lg:w-24 hover:lg:w-72
          bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 
          text-gray-100 px-5 py-5 shadow-2xl border-r border-gray-800 
          flex flex-col justify-between 
          transition-all duration-300 ease-in-out z-40 
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        <div>
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="w-11 h-11 flex items-center justify-center rounded-2xl bg-gradient-to-br from-[#b7d2f7] to-[#225577] shadow-lg">
              <span className="text-lg font-extrabold text-white">A</span>
            </div>
            <div className="transition-all duration-300 opacity-100 lg:opacity-0 group-hover:lg:opacity-100 whitespace-nowrap overflow-hidden">
              <h2 className="text-sm font-semibold tracking-wide">Azure Control Hub</h2>
              <p className="text-[11px] text-gray-400">Usage · Forecasts · KPIs</p>
            </div>
          </div>

          {/* Search */}
          <div className="mb-4">
            <div className="flex items-center gap-2 bg-gray-900/70 border border-gray-800/80 rounded-xl px-2.5 py-1.5 text-xs lg:opacity-0 group-hover:lg:opacity-100 transition-all duration-300">
              <Search className="w-3.5 h-3.5 text-gray-500" />
              <input
                type="text"
                placeholder="Search navigation…"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-transparent outline-none w-full text-[11px]"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {filteredMenuItems.map(({ name, icon: Icon, badge }) => (
              <button
                key={name}
                onClick={() => handleSelect(name)}
                className={`relative flex items-center justify-center lg:justify-center
                  py-2.5 rounded-2xl transition-all
                  ${active === name ? "text-white" : "text-gray-400 hover:text-white"}`}
              >
                {active === name && (
                  <span className="absolute left-0 h-7 w-1 bg-cyan-400 rounded-full" />
                )}

                <div
                  className={`flex items-center justify-center w-11 h-11 rounded-2xl transition-all 
                    ${
                      active === name
                        ? `bg-gradient-to-br ${bgActiveColorMap[name]} text-white shadow-lg`
                        : `bg-gray-900/80 ${iconColorMap[name]} border border-gray-800/70`
                    }`}
                >
                  <Icon size={20} />
                </div>

                <div
                  className={`
                    ml-3 flex items-center justify-between w-full pr-1 text-sm 
                    overflow-hidden whitespace-nowrap transition-all
                    lg:max-w-0 group-hover:lg:max-w-xs lg:opacity-0 group-hover:lg:opacity-100
                  `}
                >
                  <span>{name}</span>
                  {badge && (
                    <span
                      className={`ml-2 px-2 py-0.5 rounded-full text-[10px] font-semibold border
                        ${
                          badge === "Beta"
                            ? "bg-fuchsia-500/20 text-fuchsia-200 border-fuchsia-400"
                            : "bg-emerald-500/15 text-emerald-200 border-emerald-400"
                        }
                      `}
                    >
                      {badge}
                    </span>
                  )}
                </div>
              </button>
            ))}
          </nav>
        </div>

        {/* Footer */}
        <footer className="mt-6 hidden lg:flex group-hover:lg:flex flex-col gap-2 text-xs lg:opacity-0 group-hover:lg:opacity-100 transition-all">
          <p className="text-center text-[10px] text-gray-600">© 2025 Azure Forecast</p>
        </footer>
      </aside>

      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
