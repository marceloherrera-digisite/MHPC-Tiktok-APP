import { NavLink } from "react-router-dom";
import { useSupabase } from "../lib/mockSupabase";
import { 
  Video, 
  UploadCloud, 
  Smartphone, 
  Users,
  Zap
} from "lucide-react";
import { cn } from "../utils/cn";

export const Sidebar = () => {
  const { user } = useSupabase();

  const links = [
    { to: "/", icon: Video, label: "Mis Videos" },
    { to: "/upload", icon: UploadCloud, label: "Subir Video" },
    { to: "/accounts", icon: Smartphone, label: "Cuentas TikTok" },
  ];

  const adminLinks = [
    { to: "/admin", icon: Users, label: "Añadir Cliente" },
  ];

  return (
    <div className="w-64 bg-[#161925] border-r border-[#2d3142] flex flex-col h-full shadow-2xl">
      <div className="h-16 flex items-center gap-3 px-6 border-b border-[#2d3142]">
        <div className="p-1.5 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
          <Zap className="w-5 h-5 text-white" />
        </div>
        <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-indigo-400">
          MHPC
        </span>
      </div>

      <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
        <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
          Gestión
        </div>
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) => cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
              isActive 
                ? "bg-violet-500/10 text-violet-400 shadow-sm ring-1 ring-violet-500/20" 
                : "text-slate-400 hover:text-white hover:bg-[#2d3142]/50"
            )}
          >
            <link.icon className="w-4 h-4" />
            {link.label}
          </NavLink>
        ))}

        {user?.role === 'admin' && (
          <>
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mt-8 mb-4 px-2">
              Administración
            </div>
            {adminLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200",
                  isActive 
                    ? "bg-indigo-500/10 text-indigo-400 shadow-sm ring-1 ring-indigo-500/20" 
                    : "text-slate-400 hover:text-white hover:bg-[#2d3142]/50"
                )}
              >
                <link.icon className="w-4 h-4" />
                {link.label}
              </NavLink>
            ))}
          </>
        )}
      </nav>

      <div className="p-4 border-t border-[#2d3142] text-xs text-center text-slate-500">
        <p>SaaS MVP v1.0.0</p>
      </div>
    </div>
  );
};
