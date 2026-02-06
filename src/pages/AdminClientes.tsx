import { useState } from "react";
import { useSupabase } from "../lib/mockSupabase";
import { UserPlus, Users, User, Trash2 } from "lucide-react";

export const AdminClientes = () => {
  const { users, addClient } = useSupabase();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pass) return;
    
    addClient(email, pass);
    setEmail("");
    setPass("");
  };

  const clientUsers = users.filter(u => u.role === 'client');

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white flex items-center gap-2">
            Administración de Clientes
            <span className="px-2 py-0.5 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-500/20 text-indigo-300 ml-2 border border-indigo-500/30">
              Admin View
            </span>
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            Crea cuentas de cliente para darles acceso a la plataforma.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form to add client */}
        <div className="lg:col-span-1">
          <form onSubmit={handleAddClient} className="bg-[#161925] border border-[#2d3142] rounded-2xl p-6 shadow-xl space-y-4 sticky top-6">
            <div className="flex items-center gap-3 pb-4 border-b border-[#2d3142]">
              <div className="p-2 bg-indigo-500/20 rounded-lg">
                <UserPlus className="w-5 h-5 text-indigo-400" />
              </div>
              <h2 className="text-lg font-semibold text-white">Nuevo Cliente</h2>
            </div>
            
            <div className="space-y-4 pt-2">
              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Correo Electrónico</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="cliente@ejemplo.com"
                  className="w-full px-4 py-2.5 bg-[#0f111a] border border-[#2d3142] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-sm font-medium text-slate-300">Contraseña Temporal</label>
                <input
                  type="password"
                  required
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                  placeholder="Contraseña"
                  className="w-full px-4 py-2.5 bg-[#0f111a] border border-[#2d3142] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                />
                <p className="text-xs text-slate-500">Para el MVP, la contraseña de clientes se mockeará como "client123" por simplicidad.</p>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#161925] focus:ring-indigo-500 transition-all active:scale-[0.98] mt-4 shadow-lg shadow-indigo-500/20"
              >
                Crear Cliente
              </button>
            </div>
          </form>
        </div>

        {/* List of clients */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[#161925] border border-[#2d3142] rounded-2xl p-6 shadow-xl flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Users className="w-5 h-5 text-slate-400" />
              <h3 className="font-semibold text-white">Clientes Registrados</h3>
            </div>
            <span className="bg-[#2d3142] text-white text-xs font-bold px-2 py-1 rounded-md">
              Total: {clientUsers.length}
            </span>
          </div>

          <div className="space-y-3">
            {clientUsers.length === 0 ? (
              <div className="py-12 text-center border-2 border-dashed border-[#2d3142] rounded-2xl bg-[#161925]/30">
                <Users className="w-12 h-12 text-slate-600 mx-auto mb-3" />
                <h4 className="text-lg font-medium text-white mb-1">Sin clientes</h4>
                <p className="text-slate-400 text-sm">Crea tu primer cliente usando el formulario.</p>
              </div>
            ) : (
              clientUsers.map(client => (
                <div key={client.id} className="bg-[#161925] border border-[#2d3142] rounded-xl p-4 flex items-center justify-between hover:border-indigo-500/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                      <User className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium text-white">{client.email}</p>
                      <p className="text-xs text-slate-500 mt-0.5">ID: {client.id}</p>
                    </div>
                  </div>
                  <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
