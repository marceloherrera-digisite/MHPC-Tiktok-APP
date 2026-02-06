import { useState } from "react";
import { useSupabase } from "../lib/mockSupabase";
import { Navigate, useLocation } from "react-router-dom";
import { Zap, LogIn, Lock, Mail } from "lucide-react";

export const Login = () => {
  const { user, login } = useSupabase();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [error, setError] = useState("");
  const location = useLocation();

  if (user) {
    const from = location.state?.from?.pathname || "/";
    return <Navigate to={from} replace />;
  }

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, pass);
    if (!success) {
      setError("Credenciales incorrectas. (Intenta admin@mhpc.com / admin1234)");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f111a] flex items-center justify-center p-6 text-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-violet-600/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="w-full max-w-md bg-[#161925]/80 backdrop-blur-xl border border-[#2d3142] rounded-2xl p-8 shadow-2xl z-10 relative">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30 mb-4">
            <Zap className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-bold tracking-tight text-white">Bienvenido de nuevo</h2>
          <p className="text-slate-400 text-sm mt-1">Inicia sesión en MHPC Autoupload Tool</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          {error && (
            <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center font-medium">
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Correo electrónico"
                className="block w-full pl-10 pr-3 py-3 border border-[#2d3142] rounded-xl bg-[#0f111a]/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500" />
              </div>
              <input
                type="password"
                required
                value={pass}
                onChange={(e) => setPass(e.target.value)}
                placeholder="Contraseña"
                className="block w-full pl-10 pr-3 py-3 border border-[#2d3142] rounded-xl bg-[#0f111a]/50 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-lg shadow-violet-500/20 text-sm font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161925] focus:ring-violet-500 transition-all active:scale-[0.98]"
          >
            <LogIn className="w-5 h-5" />
            Entrar al Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};
