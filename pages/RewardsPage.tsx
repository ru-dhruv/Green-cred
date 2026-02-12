
import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { REWARDS } from '../constants';

const RewardsPage: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { user, setUser, redemptions, setRedemptions } = useApp();

  const handleRedeem = (rewardId: number, cost: number) => {
    if (!user) return;
    if (user.points < cost) {
      alert("Not enough points!");
      return;
    }

    if (confirm(`Redeem this for ${cost} points?`)) {
      setUser({ ...user, points: user.points - cost });
      setRedemptions(prev => [...prev, { rewardId, date: new Date().toISOString() }]);
      alert("Success! Check your Badges page.");
    }
  };

  return (
    <Layout title="Rewards Shop" navigate={navigate}>
      <div className="space-y-6">
        <div className="bg-stone-800 text-white p-6 rounded-3xl shadow-xl">
          <p className="text-sm opacity-80 mb-1">Your Total Points</p>
          <div className="flex items-center gap-3">
             <span className="text-4xl font-black">{user?.points}</span>
             <span className="text-emerald-400 font-bold uppercase tracking-widest">Available</span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {REWARDS.map(reward => {
            const alreadyRedeemed = redemptions.some(r => r.rewardId === reward.id);
            const canAfford = user ? user.points >= reward.cost : false;

            return (
              <div key={reward.id} className={`p-5 bg-white border border-stone-100 rounded-3xl shadow-sm flex items-center justify-between ${alreadyRedeemed ? 'opacity-60' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-stone-50 rounded-2xl flex items-center justify-center text-3xl">
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900">{reward.name}</h3>
                    <p className="text-xs text-stone-500 max-w-[150px] leading-tight mt-1">{reward.description}</p>
                    <div className="text-emerald-600 font-black text-sm mt-2">{reward.cost} PTS</div>
                  </div>
                </div>
                
                <button 
                  disabled={alreadyRedeemed || !canAfford}
                  onClick={() => handleRedeem(reward.id, reward.cost)}
                  className={`px-6 py-3 rounded-2xl text-sm font-bold shadow-md transition active:scale-95 ${
                    alreadyRedeemed 
                      ? 'bg-stone-200 text-stone-500 cursor-not-allowed shadow-none' 
                      : canAfford 
                        ? 'bg-emerald-600 text-white hover:bg-emerald-700' 
                        : 'bg-stone-100 text-stone-400 border border-stone-200 cursor-not-allowed shadow-none'
                  }`}
                >
                  {alreadyRedeemed ? 'Claimed' : canAfford ? 'Redeem' : 'Locked'}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default RewardsPage;
