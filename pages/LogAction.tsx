
import React, { useState, useRef } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { ACTION_TYPES } from '../constants';
import { analyzeEcoAction } from '../services/geminiService';
import { Action, Post } from '../types';

const LogAction: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { user, setUser, setActions, setPosts } = useApp();
  const [selectedType, setSelectedType] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [shareOnFeed, setShareOnFeed] = useState(true);
  const [image, setImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedType || !user) return;

    setIsSubmitting(true);
    const typeObj = ACTION_TYPES.find(t => t.value === selectedType);
    const points = typeObj?.points || 0;

    // AI Insight
    const insight = await analyzeEcoAction(selectedType, description, image || undefined);

    const newAction: Action = {
      id: Date.now().toString(),
      userId: user.id,
      username: user.username,
      type: selectedType,
      points: points,
      date: new Date().toISOString(),
      description: description,
      image: image || undefined,
      aiInsight: insight
    };

    // Update state
    setActions(prev => [...prev, newAction]);
    setUser({ ...user, points: user.points + points });

    if (shareOnFeed) {
      const newPost: Post = {
        id: 'p' + Date.now(),
        userId: user.id,
        username: user.displayName,
        userIcon: '👤',
        type: selectedType,
        description: description || `Just ${selectedType}! Earned ${points} points.`,
        image: image || undefined,
        date: new Date().toISOString(),
        likes: [],
        comments: []
      };
      setPosts(prev => [...prev, newPost]);
    }

    setIsSubmitting(false);
    alert(`Success! ${insight}`);
    navigate('dashboard');
  };

  return (
    <Layout title="Log Action" navigate={navigate}>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <label className="block text-stone-700 font-bold mb-1">What did you do?</label>
          <div className="grid grid-cols-1 gap-2">
            {ACTION_TYPES.map(action => (
              <button
                key={action.value}
                type="button"
                onClick={() => setSelectedType(action.value)}
                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition ${
                  selectedType === action.value 
                    ? 'border-emerald-600 bg-emerald-50 text-emerald-900' 
                    : 'border-stone-100 bg-white text-stone-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{action.icon}</span>
                  <span className="font-semibold">{action.value}</span>
                </div>
                <span className="text-sm font-bold">+{action.points} pts</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-2">Photo Proof (Optional)</label>
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="w-full aspect-video bg-stone-100 rounded-3xl border-2 border-dashed border-stone-300 flex flex-col items-center justify-center cursor-pointer overflow-hidden group hover:border-emerald-400 transition"
          >
            {image ? (
              <img src={image} alt="Upload" className="w-full h-full object-cover" />
            ) : (
              <>
                <span className="text-4xl mb-2 group-hover:scale-110 transition">📷</span>
                <span className="text-sm text-stone-400">Tap to upload or take photo</span>
              </>
            )}
          </div>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileChange} 
            accept="image/*" 
            className="hidden" 
          />
        </div>

        <div>
          <label className="block text-stone-700 font-bold mb-2">Describe your action</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Tell us more about what you did..."
            className="w-full p-4 rounded-2xl bg-white border border-stone-200 focus:ring-2 focus:ring-emerald-500 focus:outline-none min-h-[100px]"
          />
        </div>

        <div className="flex items-center gap-3 bg-stone-50 p-4 rounded-2xl">
          <input
            type="checkbox"
            id="share"
            checked={shareOnFeed}
            onChange={(e) => setShareOnFeed(e.target.checked)}
            className="w-5 h-5 accent-emerald-600 rounded"
          />
          <label htmlFor="share" className="text-stone-700 font-medium">Share on Community Feed</label>
        </div>

        <button
          type="submit"
          disabled={!selectedType || isSubmitting}
          className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-bold text-lg shadow-lg shadow-emerald-200 hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition active:scale-95"
        >
          {isSubmitting ? 'Analyzing with AI...' : 'Submit & Earn Points'}
        </button>
      </form>
    </Layout>
  );
};

export default LogAction;
