import { createContext, useContext, useEffect, useState, ReactNode } from "react";

// Mock Data Types
export type Role = 'admin' | 'client';
export type VideoStatus = 'pending' | 'scheduled' | 'published';

export interface Profile {
  id: string;
  email: string;
  role: Role;
}

export interface Video {
  id: string;
  title: string;
  video_url: string;
  status: VideoStatus;
  scheduled_at: string | null;
  tags: string[];
  owner_id: string;
}

interface SupabaseContextType {
  user: Profile | null;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  users: Profile[];
  addClient: (email: string, pass: string) => void;
  videos: Video[];
  addVideo: (video: Omit<Video, 'id' | 'owner_id' | 'status'> & { status?: VideoStatus }) => void;
  updateVideoStatus: (id: string, status: VideoStatus) => void;
  deleteVideo: (id: string) => void;
}

const SupabaseContext = createContext<SupabaseContextType | null>(null);

export const SupabaseProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Profile | null>(null);
  const [users, setUsers] = useState<Profile[]>([]);
  const [videos, setVideos] = useState<Video[]>([]);

  // Seed Data (CRÍTICO)
  useEffect(() => {
    const storedUsers = localStorage.getItem("mhpc_users");
    const storedVideos = localStorage.getItem("mhpc_videos");
    const storedSession = localStorage.getItem("mhpc_session");

    let parsedUsers: Profile[] = storedUsers ? JSON.parse(storedUsers) : [];
    
    // Seed admin if not exists
    if (!parsedUsers.find(u => u.email === "admin@mhpc.com")) {
      const admin: Profile = { id: 'admin-id-001', email: 'admin@mhpc.com', role: 'admin' };
      parsedUsers.push(admin);
      // We will mock password checking for MVP by hardcoding admin1234 check
      localStorage.setItem("mhpc_admin_pass", "admin1234");
    }
    
    setUsers(parsedUsers);
    localStorage.setItem("mhpc_users", JSON.stringify(parsedUsers));

    if (storedVideos) {
      setVideos(JSON.parse(storedVideos));
    }

    if (storedSession) {
      const sessionUser = parsedUsers.find(u => u.id === storedSession);
      if (sessionUser) setUser(sessionUser);
    }
  }, []);

  const login = (email: string, pass: string) => {
    if (email === "admin@mhpc.com" && pass === localStorage.getItem("mhpc_admin_pass")) {
      const adminUser = users.find(u => u.email === email)!;
      setUser(adminUser);
      localStorage.setItem("mhpc_session", adminUser.id);
      return true;
    }
    
    // For clients, we mock a default password "client123" for MVP simplicity
    const clientUser = users.find(u => u.email === email && u.role === 'client');
    if (clientUser && pass === "client123") {
      setUser(clientUser);
      localStorage.setItem("mhpc_session", clientUser.id);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("mhpc_session");
  };

  const addClient = (email: string, _pass: string) => {
    if (users.find(u => u.email === email)) return;
    const newUser: Profile = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      role: 'client'
    };
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem("mhpc_users", JSON.stringify(updatedUsers));
  };

  const addVideo = (videoData: Omit<Video, 'id' | 'owner_id' | 'status'> & { status?: VideoStatus }) => {
    if (!user) return;
    const newVideo: Video = {
      ...videoData,
      id: Math.random().toString(36).substr(2, 9),
      owner_id: user.id,
      status: videoData.status || 'pending',
    };
    const updatedVideos = [newVideo, ...videos];
    setVideos(updatedVideos);
    localStorage.setItem("mhpc_videos", JSON.stringify(updatedVideos));
  };

  const updateVideoStatus = (id: string, status: VideoStatus) => {
    const updated = videos.map(v => v.id === id ? { ...v, status } : v);
    setVideos(updated);
    localStorage.setItem("mhpc_videos", JSON.stringify(updated));
  };

  const deleteVideo = (id: string) => {
    const updated = videos.filter(v => v.id !== id);
    setVideos(updated);
    localStorage.setItem("mhpc_videos", JSON.stringify(updated));
  };

  return (
    <SupabaseContext.Provider value={{
      user, login, logout, users, addClient, videos, addVideo, updateVideoStatus, deleteVideo
    }}>
      {children}
    </SupabaseContext.Provider>
  );
};

export const useSupabase = () => {
  const context = useContext(SupabaseContext);
  if (!context) throw new Error("useSupabase must be used within SupabaseProvider");
  return context;
};
