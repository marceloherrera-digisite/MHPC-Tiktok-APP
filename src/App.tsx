import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { SupabaseProvider, useSupabase } from "./lib/mockSupabase";
import { Sidebar } from "./components/Sidebar";
import { Login } from "./pages/Login";
import { MisVideos } from "./pages/MisVideos";
import { SubirVideo } from "./pages/SubirVideo";
import { CuentasTikTok } from "./pages/CuentasTikTok";
import { AdminClientes } from "./pages/AdminClientes";
import { LogOut, User } from "lucide-react";

const ProtectedRoute = ({ children, requireAdmin }: { children: React.ReactNode, requireAdmin?: boolean }) => {
  const { user } = useSupabase();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user.role !== 'admin') {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const Layout = ({ children }: { children: React.ReactNode }) => {
  const { user, logout } = useSupabase();

  return (
    <div className="flex h-screen w-full bg-[#0f111a] text-[#e2e8f0]">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-16 flex items-center justify-between px-6 border-b border-[#2d3142] bg-[#161925]/50 backdrop-blur-md">
          <h2 className="text-lg font-semibold text-white tracking-wide">
            MHPC Autoupload Tool
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#2d3142]/50 text-sm">
              <User className="w-4 h-4 text-violet-400" />
              <span>{user?.email}</span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-violet-500/20 text-violet-300">
                {user?.role}
              </span>
            </div>
            <button
              onClick={logout}
              className="p-2 text-slate-400 hover:text-white hover:bg-[#2d3142] rounded-lg transition-colors"
              title="Cerrar sesión"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </header>
        <main className="flex-1 overflow-auto p-6 relative">
          {children}
        </main>
      </div>
    </div>
  );
};

export function App() {
  return (
    <SupabaseProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute><Layout><MisVideos /></Layout></ProtectedRoute>} />
          <Route path="/upload" element={<ProtectedRoute><Layout><SubirVideo /></Layout></ProtectedRoute>} />
          <Route path="/accounts" element={<ProtectedRoute><Layout><CuentasTikTok /></Layout></ProtectedRoute>} />
          <Route path="/admin" element={<ProtectedRoute requireAdmin><Layout><AdminClientes /></Layout></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </SupabaseProvider>
  );
}

export default App;
