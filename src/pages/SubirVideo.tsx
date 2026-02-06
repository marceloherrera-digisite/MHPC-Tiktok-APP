import { useState, useRef } from "react";
import { useSupabase, VideoStatus } from "../lib/mockSupabase";
import { useNavigate } from "react-router-dom";
import { UploadCloud, FileVideo, X, CheckCircle, Calendar, Clock } from "lucide-react";
import { cn } from "../utils/cn";

export const SubirVideo = () => {
  const { addVideo } = useSupabase();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [isScheduled, setIsScheduled] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => setIsDragging(false);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !title) return;

    setIsUploading(true);

    // Mock upload delay
    setTimeout(() => {
      let scheduled_at = null;
      let status: VideoStatus = "pending";

      if (isScheduled && scheduleDate && scheduleTime) {
        scheduled_at = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
        status = "scheduled";
      }

      addVideo({
        title,
        video_url: URL.createObjectURL(file), // Mock URL
        scheduled_at,
        tags: tags.split(',').map(t => t.trim()).filter(Boolean),
        status
      });

      setIsUploading(false);
      navigate("/");
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-white">Subir Nuevo Video</h1>
        <p className="text-slate-400 text-sm mt-1">
          Añade tu contenido para publicarlo o programarlo en tus cuentas conectadas.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="bg-[#161925] border border-[#2d3142] rounded-2xl p-6 shadow-xl space-y-8">
        {/* Drag & Drop Zone */}
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-2">Archivo de Video</label>
          <div
            className={cn(
              "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center transition-all cursor-pointer relative",
              isDragging 
                ? "border-violet-500 bg-violet-500/10" 
                : file 
                  ? "border-emerald-500/50 bg-emerald-500/5" 
                  : "border-[#2d3142] hover:border-violet-500/50 hover:bg-[#2d3142]/30"
            )}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => !file && fileInputRef.current?.click()}
          >
            <input
              type="file"
              accept="video/mp4,video/x-m4v,video/*"
              className="hidden"
              ref={fileInputRef}
              onChange={(e) => e.target.files && setFile(e.target.files[0])}
            />
            
            {file ? (
              <div className="flex flex-col items-center gap-3 w-full">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-white font-medium truncate max-w-[200px]">{file.name}</p>
                  <p className="text-slate-400 text-sm">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                  className="absolute top-4 right-4 p-2 text-slate-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#2d3142] flex items-center justify-center text-slate-400 mb-2 shadow-inner">
                  <UploadCloud className="w-8 h-8" />
                </div>
                <div>
                  <p className="text-white font-medium">Arrastra tu video aquí</p>
                  <p className="text-slate-400 text-sm">o haz clic para explorar tus archivos</p>
                </div>
                <p className="text-xs text-slate-500 mt-2">Soporta MP4, WebM (Max 500MB)</p>
              </div>
            )}
          </div>
        </div>

        {/* Video Details */}
        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Título del Video</label>
            <input
              required
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Ej. Mi increíble trend de TikTok"
              className="w-full px-4 py-3 bg-[#0f111a] border border-[#2d3142] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-300">Etiquetas (separadas por coma)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="Ej. trend, viral, fyp, dance"
              className="w-full px-4 py-3 bg-[#0f111a] border border-[#2d3142] rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Scheduling Switch */}
        <div className="p-5 rounded-xl border border-[#2d3142] bg-[#0f111a]/50 space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-white font-medium">Programar Publicación</h4>
              <p className="text-sm text-slate-400">Elige cuándo quieres que se publique el video.</p>
            </div>
            
            <button
              type="button"
              role="switch"
              aria-checked={isScheduled}
              onClick={() => setIsScheduled(!isScheduled)}
              className={cn(
                "relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center justify-center rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#161925]",
                isScheduled ? "bg-violet-500" : "bg-[#2d3142]"
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out",
                  isScheduled ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>

          {isScheduled && (
            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#2d3142] animate-in slide-in-from-top-2 duration-300">
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Fecha</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="date"
                    required={isScheduled}
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#161925] border border-[#2d3142] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-medium text-slate-400 uppercase tracking-wider">Hora</label>
                <div className="relative">
                  <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                  <input
                    type="time"
                    required={isScheduled}
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="w-full pl-9 pr-4 py-2.5 bg-[#161925] border border-[#2d3142] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-violet-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Submit */}
        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            disabled={!file || !title || isUploading}
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium text-white bg-gradient-to-r from-violet-500 to-indigo-600 hover:from-violet-600 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-violet-500/20 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2 focus:ring-offset-[#161925] transition-all active:scale-[0.98]"
          >
            {isUploading ? (
              <>
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Subiendo y Procesando...
              </>
            ) : (
              <>
                <FileVideo className="w-5 h-5" />
                Guardar Video
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};
