
import React from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { NGOS } from '../constants';

const NGOConnect: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { connectedNGOs, setConnectedNGOs } = useApp();

  const toggleConnect = (id: number) => {
    setConnectedNGOs(prev => {
      if (prev.includes(id)) {
        return prev.filter(nId => nId !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <Layout title="NGO Network" navigate={navigate}>
      <div className="space-y-6">
        <p className="text-stone-500 text-sm px-2">Discover organizations dedicated to environmental conservation and join their causes.</p>
        
        <div className="grid grid-cols-1 gap-4">
          {NGOS.map(ngo => {
            const isConnected = connectedNGOs.includes(ngo.id);
            return (
              <div key={ngo.id} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm">
                <div className="flex gap-4 items-start">
                  <div className="text-4xl p-3 bg-stone-50 rounded-2xl">{ngo.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-bold text-stone-900">{ngo.name}</h3>
                    <p className="text-stone-500 text-xs mt-1 leading-relaxed">{ngo.description}</p>
                    <div className="flex gap-2 mt-4">
                      <a 
                        href={ngo.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 text-center py-2 bg-stone-100 text-stone-600 font-bold text-xs rounded-xl hover:bg-stone-200 transition"
                      >
                        Visit Site
                      </a>
                      <button 
                        onClick={() => toggleConnect(ngo.id)}
                        className={`flex-1 py-2 font-bold text-xs rounded-xl transition ${
                          isConnected 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-md shadow-emerald-100'
                        }`}
                      >
                        {isConnected ? 'Connected ✓' : 'Connect'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default NGOConnect;
