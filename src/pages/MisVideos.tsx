import { useSupabase, Video, VideoStatus } from "../lib/mockSupabase";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { Clock, Play, Tag, Trash2 } from "lucide-react";
import { cn } from "../utils/cn";

export const MisVideos = () => {
  const { videos, user, deleteVideo } = useSupabase();

  // Filter videos so users only see their own, or admin sees all
  const displayVideos = user?.role === 'admin' 
    ? videos 
    : videos.filter(v => v.owner_id === user?.id);

  const statusConfig: Record<VideoStatus, { label: string; className: string }> = {
    pending: { label: "Pendiente", className: "bg-amber-500/10 text-amber-500 ring-amber-500/20" },
    scheduled: { label: "Programado", className: "bg-indigo-500/10 text-indigo-400 ring-indigo-500/20" },
    published: { label: "Publicado", className: "bg-emerald-500/10 text-emerald-500 ring-emerald-500/20" },
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white">Mis Videos</h1>
          <p className="text-slate-400 text-sm mt-1">
            Gestiona tu contenido y estado de publicación en TikTok.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayVideos.length === 0 ? (
          <div className="col-span-full py-16 text-center border-2 border-dashed border-[#2d3142] rounded-2xl bg-[#161925]/30">
            <Play className="w-12 h-12 text-slate-600 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">No tienes videos</h3>
            <p className="text-slate-400">Sube tu primer video para empezar a programar.</p>
          </div>
        ) : (
          displayVideos.map((video) => (
            <VideoCard 
              key={video.id} 
              video={video} 
              config={statusConfig[video.status]} 
              onDelete={() => deleteVideo(video.id)}
            />
          ))
        )}
      </div>
    </div>
  );
};

const VideoCard = ({ 
  video, 
  config, 
  onDelete 
}: { 
  video: Video; 
  config: { label: string; className: string };
  onDelete: () => void;
}) => {
  return (
    <div className="bg-[#161925] border border-[#2d3142] rounded-2xl p-5 hover:border-violet-500/50 transition-colors group relative overflow-hidden flex flex-col h-full shadow-lg">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1 min-w-0 pr-4">
          <h3 className="font-semibold text-lg text-white truncate" title={video.title}>
            {video.title}
          </h3>
          <div className="flex items-center gap-2 mt-2">
            <span className={cn("px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ring-1 ring-inset", config.className)}>
              {config.label}
            </span>
          </div>
        </div>
        <button 
          onClick={onDelete}
          className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
          title="Eliminar video"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Mock Video Preview thumbnail area */}
      <div className="w-full aspect-video bg-[#0f111a] rounded-xl border border-[#2d3142] flex items-center justify-center mb-4 relative overflow-hidden group-hover:border-violet-500/30 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f111a] to-transparent opacity-50 z-10" />
        <Play className="w-8 h-8 text-slate-600" />
        {video.scheduled_at && (
          <div className="absolute bottom-2 left-2 z-20 flex items-center gap-1.5 text-xs font-medium text-white bg-black/60 backdrop-blur px-2 py-1 rounded-md">
            <Clock className="w-3 h-3 text-indigo-400" />
            {format(new Date(video.scheduled_at), "dd MMM, HH:mm", { locale: es })}
          </div>
        )}
      </div>

      <div className="mt-auto pt-4 border-t border-[#2d3142] flex items-center flex-wrap gap-2">
        {video.tags.length > 0 ? (
          video.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs text-slate-400 bg-[#2d3142]/50 px-2 py-1 rounded-md">
              <Tag className="w-3 h-3" />
              {tag}
            </span>
          ))
        ) : (
          <span className="text-xs text-slate-500 italic">Sin etiquetas</span>
        )}
      </div>
    </div>
  );
};
