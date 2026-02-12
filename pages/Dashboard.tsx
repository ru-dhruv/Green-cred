
import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { getDailyEcoTip } from '../services/geminiService';

const Dashboard: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { user, actions } = useApp();
  const [tip, setTip] = useState<string>("Loading tip...");

  useEffect(() => {
    getDailyEcoTip().then(setTip);
  }, []);

  const recentActions = [...actions].reverse().slice(0, 5);

  return (
    <Layout title="Dashboard" navigate={navigate} showBack={false}>
      <div className="space-y-6">
        <section className="bg-gradient-to-br from-emerald-50 to-teal-50 p-6 rounded-3xl border border-emerald-100 shadow-sm">
          <h2 className="text-2xl font-bold text-stone-800">Hello, {user?.displayName}!</h2>
          <p className="text-stone-600 mt-1">Every small action counts toward a greener planet.</p>
          
          <div className="grid grid-cols-3 gap-3 mt-6">
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 text-center">
              <div className="text-xl mb-1">🌱</div>
              <div className="text-lg font-bold text-emerald-700">{actions.length}</div>
              <div className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Actions</div>
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 text-center">
              <div className="text-xl mb-1">⭐</div>
              <div className="text-lg font-bold text-emerald-700">{user?.points}</div>
              <div className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Points</div>
            </div>
            <div className="bg-white p-3 rounded-2xl shadow-sm border border-emerald-50 text-center">
              <div className="text-xl mb-1">🏅</div>
              <div className="text-lg font-bold text-emerald-700">Level 1</div>
              <div className="text-[10px] uppercase text-stone-400 font-semibold tracking-wider">Rank</div>
            </div>
          </div>
        </section>

        <section className="bg-amber-50 border border-amber-100 p-4 rounded-2xl">
          <div className="flex items-start gap-3">
            <span className="text-xl">💡</span>
            <div>
              <h3 className="font-bold text-amber-900 text-sm">Daily AI Eco-Tip</h3>
              <p className="text-amber-800 text-sm italic mt-1 leading-relaxed">"{tip}"</p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('log')}
            className="flex flex-col items-center justify-center p-6 bg-emerald-600 text-white rounded-3xl shadow-lg shadow-emerald-200 hover:bg-emerald-700 transition active:scale-95"
          >
            <span className="text-3xl mb-2">📸</span>
            <span className="font-bold">Log Action</span>
          </button>
          <button 
            onClick={() => navigate('rewards')}
            className="flex flex-col items-center justify-center p-6 bg-amber-500 text-white rounded-3xl shadow-lg shadow-amber-200 hover:bg-amber-600 transition active:scale-95"
          >
            <span className="text-3xl mb-2">🎁</span>
            <span className="font-bold">Rewards</span>
          </button>
          <button 
            onClick={() => navigate('feed')}
            className="flex flex-col items-center justify-center p-6 bg-sky-500 text-white rounded-3xl shadow-lg shadow-sky-200 hover:bg-sky-600 transition active:scale-95"
          >
            <span className="text-3xl mb-2">🏘️</span>
            <span className="font-bold">Community</span>
          </button>
          <button 
            onClick={() => navigate('badges')}
            className="flex flex-col items-center justify-center p-6 bg-stone-700 text-white rounded-3xl shadow-lg shadow-stone-200 hover:bg-stone-800 transition active:scale-95"
          >
            <span className="text-3xl mb-2">🎖️</span>
            <span className="font-bold">Badges</span>
          </button>
        </div>

        <section>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-stone-800">Recent Activity</h2>
            <button className="text-sm text-emerald-600 font-semibold">See All</button>
          </div>
          {recentActions.length === 0 ? (
            <div className="text-center py-8 text-stone-400 border-2 border-dashed border-stone-200 rounded-3xl">
              <p>No actions logged yet.</p>
              <button onClick={() => navigate('log')} className="mt-2 text-emerald-600 underline">Start your journey</button>
            </div>
          ) : (
            <div className="space-y-3">
              {recentActions.map(action => (
                <div key={action.id} className="flex items-center justify-between p-4 bg-white border border-stone-100 rounded-2xl shadow-sm">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 flex items-center justify-center rounded-xl text-lg">
                      {action.type.toLowerCase().includes('tree') ? '🌳' : 
                       action.type.toLowerCase().includes('cycle') ? '♻️' : 
                       action.type.toLowerCase().includes('bike') ? '🚲' : '🍃'}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-800 text-sm">{action.type}</h4>
                      <p className="text-[10px] text-stone-400">{new Date(action.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-emerald-600 font-bold text-sm">+{action.points}</div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </Layout>
  );
};

export default Dashboard;
