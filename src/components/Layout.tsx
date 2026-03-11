import { Outlet, NavLink } from 'react-router-dom';
import { Activity, HeartPulse, PlayCircle } from 'lucide-react';
import { cn } from '../lib/utils';

export default function Layout() {
  return (
    <div className="flex flex-col h-[100dvh] bg-neutral-50 text-neutral-900 font-sans">
      <main className="flex-1 overflow-y-auto pb-28 pt-4">
        <Outlet />
      </main>
      
      <nav className="fixed bottom-0 w-full bg-white border-t border-neutral-200 shadow-lg">
        <div className="flex justify-around items-center h-20 max-w-md mx-auto">
          <NavLink 
            to="/" 
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-emerald-600 font-medium" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <Activity className="w-7 h-7" />
            <span className="text-xs uppercase tracking-wider">Caminata</span>
          </NavLink>
          
          <NavLink 
            to="/health" 
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-emerald-600 font-medium" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <HeartPulse className="w-7 h-7" />
            <span className="text-xs uppercase tracking-wider">Salud</span>
          </NavLink>
          
          <NavLink 
            to="/videos" 
            className={({ isActive }) => cn(
              "flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors",
              isActive ? "text-emerald-600 font-medium" : "text-neutral-500 hover:text-neutral-700"
            )}
          >
            <PlayCircle className="w-7 h-7" />
            <span className="text-xs uppercase tracking-wider">Videos</span>
          </NavLink>
        </div>
      </nav>
    </div>
  );
}
