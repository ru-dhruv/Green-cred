
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { Resource } from '../types';

const ResourcesPage: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { resources, setResources } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  const categories = ['All', ...Array.from(new Set(resources.map(r => r.category)))];

  const filtered = resources.filter(r => {
    const matchesFilter = filter === 'All' || r.category === filter;
    const matchesSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.content.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <Layout title="Eco Resources" navigate={navigate}>
      <div className="space-y-6">
        <div className="space-y-4">
          <input 
            type="text" 
            placeholder="Search guides, tips, resources..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-4 rounded-2xl bg-stone-100 border-none focus:ring-2 focus:ring-emerald-500 shadow-inner"
          />
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition ${
                  filter === cat ? 'bg-emerald-600 text-white shadow-md' : 'bg-white border border-stone-200 text-stone-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-20 text-stone-400">No resources found matching your search.</div>
          ) : (
            filtered.map(res => (
              <div key={res.id} className="bg-white p-6 rounded-3xl border border-stone-100 shadow-sm hover:shadow-md transition">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-stone-900 leading-tight">{res.title}</h3>
                  <span className="text-[10px] uppercase font-black px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded-md">{res.category}</span>
                </div>
                <p className="text-stone-600 text-sm mb-4 leading-relaxed">{res.content}</p>
                {res.link && (
                  <a 
                    href={res.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-emerald-600 font-bold text-sm hover:underline"
                  >
                    Learn more <span>↗</span>
                  </a>
                )}
              </div>
            ))
          )}
        </div>

        <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 text-center">
          <h4 className="font-bold text-emerald-900 mb-2">Know a good resource?</h4>
          <p className="text-emerald-700 text-xs mb-4">Share helpful links with the community to earn bonus points.</p>
          <button className="bg-emerald-600 text-white px-6 py-2 rounded-full font-bold text-sm shadow-md shadow-emerald-200">Submit Resource</button>
        </div>
      </div>
    </Layout>
  );
};

export default ResourcesPage;
