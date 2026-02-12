
import React, { useState } from 'react';
import { User } from '../types';

const Login: React.FC<{ onLogin: (user: User) => void }> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    const mockUser: User = {
      id: 'u' + Date.now(),
      username: username,
      displayName: displayName || username,
      points: 100 // Starting bonus
    };
    onLogin(mockUser);
  };

  const startDemo = () => {
    onLogin({
      id: 'demo-user',
      username: 'demo_eco',
      displayName: 'Eco Pioneer',
      points: 1250
    });
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gradient-to-b from-emerald-700 to-emerald-900 text-white">
      <div className="w-full max-w-sm space-y-12">
        <div className="text-center space-y-4">
          <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl flex items-center justify-center text-5xl mx-auto shadow-2xl">
            🌿
          </div>
          <h1 className="text-4xl font-black tracking-tighter">Green Credits</h1>
          <p className="text-emerald-100 font-medium opacity-80">Track your impact, save the planet.</p>
        </div>

        <div className="bg-white/10 backdrop-blur-xl p-8 rounded-[2.5rem] border border-white/20 shadow-2xl space-y-6">
          <h2 className="text-xl font-bold text-center mb-4">
            {isSignup ? 'Create Account' : 'Welcome Back'}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 ml-2">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="eco_warrior"
                className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-white/30"
                required
              />
            </div>

            {isSignup && (
              <div className="space-y-1">
                <label className="text-[10px] uppercase font-bold tracking-widest text-emerald-200 ml-2">Display Name</label>
                <input 
                  type="text" 
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  placeholder="Jane Doe"
                  className="w-full p-4 bg-white/10 border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-400 placeholder-white/30"
                  required
                />
              </div>
            )}

            <button 
              type="submit"
              className="w-full py-4 bg-white text-emerald-900 font-black rounded-2xl shadow-xl hover:bg-emerald-50 transition active:scale-[0.98]"
            >
              {isSignup ? 'Join the Movement' : 'Login'}
            </button>
          </form>

          <div className="text-center space-y-4 pt-2">
            <button 
              onClick={() => setIsSignup(!isSignup)}
              className="text-sm font-medium opacity-80 hover:opacity-100"
            >
              {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
            </button>
            <div className="relative">
               <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-white/10"></div></div>
               <div className="relative flex justify-center text-xs uppercase"><span className="px-2 bg-emerald-800 text-white/40 font-bold">Or</span></div>
            </div>
            <button 
              onClick={startDemo}
              className="w-full py-3 bg-white/10 border border-white/20 rounded-2xl font-bold hover:bg-white/20 transition"
            >
              Explore in Demo Mode
            </button>
          </div>
        </div>

        <p className="text-center text-[10px] uppercase font-bold tracking-[0.2em] text-emerald-300 opacity-50">
          Powered by Green Credits AI
        </p>
      </div>
    </div>
  );
};

export default Login;
