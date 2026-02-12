
import React from 'react';
import { useApp } from '../App';

interface LayoutProps {
  title: string;
  navigate: (page: string) => void;
  children: React.ReactNode;
  showBack?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ title, navigate, children, showBack = true }) => {
  const { user, setUser } = useApp();

  const handleLogout = () => {
    if (confirm('Are you sure you want to logout?')) {
      setUser(null);
    }
  };

  return (
    <>
      <header className="bg-emerald-700 text-white p-4 sticky top-0 z-50 shadow-md">
        <div className="flex justify-between items-center mb-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🌿</span>
            <h1 className="text-lg font-bold tracking-tight">{title}</h1>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
              {user?.points || 0} <span className="text-xs opacity-80 uppercase ml-1">Pts</span>
            </div>
            <button 
              onClick={handleLogout}
              className="text-xs bg-white/10 hover:bg-white/20 px-2 py-1 rounded transition"
            >
              Logout
            </button>
          </div>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
           <button onClick={() => navigate('dashboard')} className="text-xs font-medium whitespace-nowrap opacity-90 hover:opacity-100">Home</button>
           <button onClick={() => navigate('feed')} className="text-xs font-medium whitespace-nowrap opacity-90 hover:opacity-100">Feed</button>
           <button onClick={() => navigate('resources')} className="text-xs font-medium whitespace-nowrap opacity-90 hover:opacity-100">Guides</button>
           <button onClick={() => navigate('ngo')} className="text-xs font-medium whitespace-nowrap opacity-90 hover:opacity-100">NGOs</button>
        </div>
      </header>
      <main className="flex-1 p-4 overflow-y-auto">
        {showBack && (
          <button 
            onClick={() => navigate('dashboard')} 
            className="text-stone-500 text-sm mb-4 hover:text-emerald-700 flex items-center gap-1"
          >
            ← Back to Dashboard
          </button>
        )}
        {children}
      </main>
    </>
  );
};

export default Layout;
