import { useState } from "react";
import { useSupabase } from "../lib/mockSupabase";
import { Link2, Plus, Smartphone, Trash2 } from "lucide-react";

export const CuentasTikTok = () => {
  const { user } = useSupabase();
  const [accounts, setAccounts] = useState([
    { id: 1, username: "@" + user?.email?.split('@')[0], status: "active", followers: "12.4K" }
  ]);
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkAccount = () => {
    setIsLinking(true);
    setTimeout(() => {
      setAccounts(prev => [...prev, {
        id: Date.now(),
        username: "@cuenta_nueva",
        status: "active",
        followers: "0"
      }]);
      setIsLinking(false);
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Cuentas de TikTok</h1>
          <p className="text-slate-400 text-sm mt-1">
            Gestiona las cuentas donde se publicarán tus videos.
          </p>
        </div>
        <button
          onClick={handleLinkAccount}
          disabled={isLinking}
          className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium text-white bg-white/5 hover:bg-white/10 border border-white/10 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:opacity-50"
        >
          {isLinking ? (
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          Vincular Cuenta
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {accounts.map(acc => (
          <div key={acc.id} className="bg-[#161925] border border-[#2d3142] rounded-2xl p-6 flex items-start justify-between shadow-lg hover:border-violet-500/30 transition-colors group">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[#25F4EE] to-[#FE2C55] p-0.5">
                <div className="w-full h-full bg-[#161925] rounded-full flex items-center justify-center border-2 border-[#161925]">
                  <Smartphone className="w-6 h-6 text-white" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">{acc.username}</h3>
                <div className="flex items-center gap-3 mt-1 text-sm">
                  <span className="flex items-center gap-1.5 text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-md font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Conectada
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400">{acc.followers} seguidores</span>
                </div>
              </div>
            </div>
            
            <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100">
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
        
        <button 
          onClick={handleLinkAccount}
          disabled={isLinking}
          className="bg-[#0f111a] border-2 border-dashed border-[#2d3142] rounded-2xl p-6 flex flex-col items-center justify-center text-slate-500 hover:text-violet-400 hover:border-violet-500/50 hover:bg-violet-500/5 transition-all min-h-[120px]"
        >
          <Link2 className="w-8 h-8 mb-2" />
          <span className="font-medium">Añadir otra cuenta</span>
        </button>
      </div>
    </div>
  );
};
