
import React, { useState, useEffect, createContext, useContext } from 'react';
import { User, Action, Post, Reward, NGO, Resource, Comment } from './types';
import { REWARDS, NGOS, INITIAL_RESOURCES } from './constants';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import LogAction from './pages/LogAction';
import RewardsPage from './pages/RewardsPage';
import BadgesPage from './pages/BadgesPage';
import CommunityFeed from './pages/CommunityFeed';
import ResourcesPage from './pages/ResourcesPage';
import NGOConnect from './pages/NGOConnect';

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  actions: Action[];
  setActions: React.Dispatch<React.SetStateAction<Action[]>>;
  posts: Post[];
  setPosts: React.Dispatch<React.SetStateAction<Post[]>>;
  resources: Resource[];
  setResources: React.Dispatch<React.SetStateAction<Resource[]>>;
  connectedNGOs: number[];
  setConnectedNGOs: React.Dispatch<React.SetStateAction<number[]>>;
  redemptions: { rewardId: number; date: string }[];
  setRedemptions: React.Dispatch<React.SetStateAction<{ rewardId: number; date: string }[]>>;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('dashboard');
  const [user, setUser] = useState<User | null>(null);
  const [actions, setActions] = useState<Action[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [resources, setResources] = useState<Resource[]>(INITIAL_RESOURCES);
  const [connectedNGOs, setConnectedNGOs] = useState<number[]>([]);
  const [redemptions, setRedemptions] = useState<{ rewardId: number; date: string }[]>([]);

  // Load from local storage
  useEffect(() => {
    const storedUser = localStorage.getItem('gc_user');
    if (storedUser) setUser(JSON.parse(storedUser));

    const storedActions = localStorage.getItem('gc_actions');
    if (storedActions) setActions(JSON.parse(storedActions));

    const storedPosts = localStorage.getItem('gc_posts');
    if (storedPosts) setPosts(JSON.parse(storedPosts));

    const storedNGOs = localStorage.getItem('gc_ngos');
    if (storedNGOs) setConnectedNGOs(JSON.parse(storedNGOs));

    const storedRedemptions = localStorage.getItem('gc_redemptions');
    if (storedRedemptions) setRedemptions(JSON.parse(storedRedemptions));
    
    const storedResources = localStorage.getItem('gc_resources');
    if (storedResources) setResources(JSON.parse(storedResources));
  }, []);

  // Save to local storage
  useEffect(() => {
    if (user) localStorage.setItem('gc_user', JSON.stringify(user));
    else localStorage.removeItem('gc_user');
  }, [user]);

  useEffect(() => {
    localStorage.setItem('gc_actions', JSON.stringify(actions));
  }, [actions]);

  useEffect(() => {
    localStorage.setItem('gc_posts', JSON.stringify(posts));
  }, [posts]);

  useEffect(() => {
    localStorage.setItem('gc_ngos', JSON.stringify(connectedNGOs));
  }, [connectedNGOs]);

  useEffect(() => {
    localStorage.setItem('gc_redemptions', JSON.stringify(redemptions));
  }, [redemptions]);

  useEffect(() => {
    localStorage.setItem('gc_resources', JSON.stringify(resources));
  }, [resources]);

  const renderPage = () => {
    if (!user) return <Login onLogin={(u) => { setUser(u); setCurrentPage('dashboard'); }} />;

    switch (currentPage) {
      case 'dashboard': return <Dashboard navigate={setCurrentPage} />;
      case 'log': return <LogAction navigate={setCurrentPage} />;
      case 'rewards': return <RewardsPage navigate={setCurrentPage} />;
      case 'badges': return <BadgesPage navigate={setCurrentPage} />;
      case 'feed': return <CommunityFeed navigate={setCurrentPage} />;
      case 'resources': return <ResourcesPage navigate={setCurrentPage} />;
      case 'ngo': return <NGOConnect navigate={setCurrentPage} />;
      default: return <Dashboard navigate={setCurrentPage} />;
    }
  };

  return (
    <AppContext.Provider value={{ 
      user, setUser, actions, setActions, posts, setPosts, 
      resources, setResources, connectedNGOs, setConnectedNGOs,
      redemptions, setRedemptions
    }}>
      <div className="min-h-screen max-w-lg mx-auto bg-white shadow-xl flex flex-col">
        {renderPage()}
      </div>
    </AppContext.Provider>
  );
};

export default App;
