
import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { REWARDS } from '../constants';

const BadgesPage: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { redemptions, actions, user } = useApp();

  const earnedRewards = redemptions.map(red => {
    return REWARDS.find(rew => rew.id === red.rewardId);
  }).filter(Boolean);

  return (
    <Layout title="My Badges" navigate={navigate}>
      <div className="space-y-8">
        <section>
          <div className="grid grid-cols-2 gap-4">
             <div className="bg-emerald-50 p-5 rounded-3xl border border-emerald-100 text-center">
                <div className="text-3xl font-black text-emerald-800">{actions.length}</div>
                <div className="text-[10px] uppercase text-emerald-600 font-bold tracking-widest">Impact Logs</div>
             </div>
             <div className="bg-sky-50 p-5 rounded-3xl border border-sky-100 text-center">
                <div className="text-3xl font-black text-sky-800">{earnedRewards.length}</div>
                <div className="text-[10px] uppercase text-sky-600 font-bold tracking-widest">Badges Earned</div>
             </div>
          </div>
        </section>

        <section>
          <h2 className="text-lg font-bold text-stone-800 mb-4 px-2">Collected Achievements</h2>
          {earnedRewards.length === 0 ? (
            <div className="bg-stone-50 p-10 rounded-3xl text-center border-2 border-dashed border-stone-200">
               <span className="text-5xl block mb-4">🛡️</span>
               <p className="text-stone-500 font-medium">No badges yet. Keep taking eco-actions!</p>
               <button onClick={() => navigate('rewards')} className="mt-4 text-emerald-600 font-bold hover:underline">Go to Rewards Shop</button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {earnedRewards.map((reward, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm text-center flex flex-col items-center">
                  <div className="text-5xl mb-4 p-4 bg-stone-50 rounded-full">{reward?.icon}</div>
                  <h3 className="font-bold text-stone-800 text-sm">{reward?.name}</h3>
                  <div className="mt-4 px-3 py-1 bg-emerald-600 text-white text-[10px] uppercase font-bold rounded-full">Earned</div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="bg-stone-900 text-white p-6 rounded-3xl shadow-lg">
           <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl">🌱</span>
              <h3 className="font-bold">Sustainability Network</h3>
           </div>
           <p className="text-stone-400 text-sm leading-relaxed mb-6">Connect your impact with global NGOs to make an even bigger difference.</p>
           <button 
            onClick={() => navigate('ngo')}
            className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 rounded-2xl font-bold transition flex items-center justify-center gap-2"
           >
             Connect with NGOs <span className="text-xl">🤝</span>
           </button>
        </section>
      </div>
    </Layout>
  );
};

export default BadgesPage;
