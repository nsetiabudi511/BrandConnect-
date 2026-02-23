import { 
  Home,
  Video,
  BarChart3,
  MessageSquare,
  DollarSign,
  Settings,
  TrendingUp
} from "lucide-react";

export function Sidebar() {
  const menuItems = [
    { icon: <Home className="w-5 h-5" />, label: "Dashboard", active: false },
    { icon: <Video className="w-5 h-5" />, label: "Content", active: false },
    { icon: <BarChart3 className="w-5 h-5" />, label: "Analytics", active: false },
    { icon: <MessageSquare className="w-5 h-5" />, label: "Comments", active: false },
    { icon: <DollarSign className="w-5 h-5" />, label: "Earn", active: true, badge: "New" },
    { icon: <Settings className="w-5 h-5" />, label: "Settings", active: false },
  ];

  return (
    <div className="w-64 bg-[#282828] text-white h-screen fixed left-0 top-0 flex flex-col">
      {/* Logo */}
      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
          </div>
          <span className="font-semibold">YouTube Studio</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4">
        {menuItems.map((item, index) => (
          <button
            key={index}
            className={`w-full flex items-center justify-between gap-3 px-4 py-3 hover:bg-[#3d3d3d] transition-colors ${
              item.active ? 'bg-[#3d3d3d]' : ''
            }`}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </div>
            {item.badge && (
              <span className="bg-blue-600 text-xs px-2 py-0.5 rounded-full">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-700">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <span className="text-sm font-semibold">JL</span>
          </div>
          <div className="flex-1">
            <div className="text-sm font-medium">Jacob L.</div>
            <div className="text-xs text-gray-400">12.5K subscribers</div>
          </div>
        </div>
      </div>
    </div>
  );
}
