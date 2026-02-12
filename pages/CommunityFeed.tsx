
import React, { useState } from 'react';
import Layout from '../components/Layout';
import { useApp } from '../App';
import { Post, Comment } from '../types';

const CommunityFeed: React.FC<{ navigate: (p: string) => void }> = ({ navigate }) => {
  const { posts, setPosts, user } = useApp();
  const [commentingId, setCommentingId] = useState<string | null>(null);
  const [commentText, setCommentText] = useState('');

  const handleLike = (postId: string) => {
    if (!user) return;
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        const hasLiked = post.likes.includes(user.username);
        return {
          ...post,
          likes: hasLiked 
            ? post.likes.filter(u => u !== user.username) 
            : [...post.likes, user.username]
        };
      }
      return post;
    }));
  };

  const handleAddComment = (postId: string) => {
    if (!user || !commentText.trim()) return;
    const newComment: Comment = {
      id: Date.now().toString(),
      username: user.displayName,
      text: commentText,
      date: new Date().toISOString()
    };

    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return { ...post, comments: [...post.comments, newComment] };
      }
      return post;
    }));
    setCommentText('');
    setCommentingId(null);
  };

  const sortedPosts = [...posts].reverse();

  return (
    <Layout title="Community" navigate={navigate}>
      <div className="space-y-6">
        {sortedPosts.length === 0 ? (
          <div className="text-center py-20 text-stone-400">
            <span className="text-5xl block mb-4">🏠</span>
            <p className="text-lg">No posts yet. Be the first to share!</p>
            <button 
              onClick={() => navigate('log')}
              className="mt-4 bg-emerald-600 text-white px-6 py-2 rounded-full font-bold"
            >
              Post Action
            </button>
          </div>
        ) : (
          sortedPosts.map(post => {
            const hasLiked = user ? post.likes.includes(user.username) : false;
            return (
              <div key={post.id} className="bg-white border border-stone-100 rounded-3xl shadow-sm overflow-hidden">
                <div className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-xl">
                      {post.userIcon}
                    </div>
                    <div>
                      <h4 className="font-bold text-stone-900 text-sm">{post.username}</h4>
                      <p className="text-[10px] text-stone-400 uppercase font-semibold">{post.type} • {new Date(post.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>

                {post.image && (
                  <img src={post.image} alt="Activity" className="w-full aspect-video object-cover" />
                )}

                <div className="p-4 space-y-3">
                  <p className="text-stone-700 text-sm leading-relaxed">{post.description}</p>
                  
                  <div className="flex items-center gap-6 pt-2 border-t border-stone-50">
                    <button 
                      onClick={() => handleLike(post.id)}
                      className={`flex items-center gap-1.5 text-sm font-bold transition ${hasLiked ? 'text-rose-500' : 'text-stone-400'}`}
                    >
                      <span className="text-lg">{hasLiked ? '❤️' : '🤍'}</span> {post.likes.length}
                    </button>
                    <button 
                      onClick={() => setCommentingId(commentingId === post.id ? null : post.id)}
                      className="flex items-center gap-1.5 text-sm font-bold text-stone-400"
                    >
                      <span className="text-lg">💬</span> {post.comments.length}
                    </button>
                  </div>

                  {post.comments.length > 0 && (
                    <div className="bg-stone-50 p-3 rounded-2xl space-y-2 mt-2">
                      {post.comments.map(c => (
                        <div key={c.id} className="text-xs">
                          <span className="font-bold text-emerald-800">{c.username}</span> {c.text}
                        </div>
                      ))}
                    </div>
                  )}

                  {commentingId === post.id && (
                    <div className="flex gap-2 pt-2">
                      <input 
                        type="text"
                        value={commentText}
                        onChange={(e) => setCommentText(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-stone-100 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                      <button 
                        onClick={() => handleAddComment(post.id)}
                        className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-sm font-bold"
                      >
                        Post
                      </button>
                    </div>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </Layout>
  );
};

export default CommunityFeed;
