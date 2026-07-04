import React, { useState } from 'react';
import { X, Heart, MessageCircle, Send, Sparkles } from 'lucide-react';

interface InstagramPost {
  id: string;
  image: string;
  likes: number;
  comments: number;
  caption: string;
}

interface InstagramLightboxProps {
  post: InstagramPost | null;
  onClose: () => void;
}

interface UserComment {
  user: string;
  text: string;
  time: string;
}

export default function InstagramLightbox({ post, onClose }: InstagramLightboxProps) {
  if (!post) return null;

  const [likesCount, setLikesCount] = useState(post.likes);
  const [hasLiked, setHasLiked] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [commentsList, setCommentsList] = useState<UserComment[]>([
    { user: 'julian_vane', text: 'Stunning light balance! The espresso look is premium.', time: '2h ago' },
    { user: 'coffee_architect', text: 'Love the white oak tables, who designed them?', time: '4h ago' },
    { user: 'village_native', text: 'My daily ritual alcove right there. Outstanding work.', time: '6h ago' },
  ]);

  const handleLikeToggle = () => {
    if (hasLiked) {
      setLikesCount(likesCount - 1);
      setHasLiked(false);
    } else {
      setLikesCount(likesCount + 1);
      setHasLiked(true);
    }
  };

  const handleSendComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const commentObj: UserComment = {
      user: 'guest_connoisseur',
      text: newComment,
      time: 'Just now',
    };

    setCommentsList([...commentsList, commentObj]);
    setNewComment('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-primary/85 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Lightbox Modal */}
      <div className="relative bg-surface rounded-2xl overflow-hidden max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 shadow-2xl z-10 border border-primary/5 h-[80vh] md:h-[500px]">
        {/* Left: Image */}
        <div className="relative bg-primary overflow-hidden flex items-center justify-center h-[35vh] md:h-full">
          <img
            src={post.image}
            alt="Instagram feed"
            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
          />
          {hasLiked && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <Heart className="w-20 h-20 text-white fill-current opacity-25 animate-ping" />
            </div>
          )}
        </div>

        {/* Right: Comments, Stats and Interactivity */}
        <div className="p-6 md:p-8 flex flex-col justify-between bg-white h-[45vh] md:h-full">
          {/* Header */}
          <div className="flex justify-between items-start border-b border-primary/5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-secondary/15 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <span className="font-sans text-xs font-bold text-primary block">@TheCoffeeCorner</span>
                <span className="text-[10px] text-on-surface-variant/50 uppercase font-semibold">
                  Greenwich Village, NY
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-primary/5 text-primary/40 hover:text-primary transition-all cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrolling Feed (Caption + Comments) */}
          <div className="flex-1 overflow-y-auto py-4 space-y-4 pr-1 text-xs">
            {/* Main Caption */}
            <div className="flex gap-2 items-start bg-surface-container-low p-3 rounded-lg border border-primary/5">
              <span className="font-bold text-primary min-w-[100px]">thecoffeecorner</span>
              <p className="text-on-surface-variant leading-relaxed">
                {post.caption}
              </p>
            </div>

            {/* Comment List */}
            <div className="space-y-3.5 pt-2">
              <span className="text-[9px] uppercase tracking-widest font-bold text-on-surface-variant/50 block">
                Activity Feed ({commentsList.length})
              </span>
              {commentsList.map((comm, idx) => (
                <div key={idx} className="flex gap-2.5 items-start">
                  <span className="font-bold text-primary min-w-[100px] hover:underline cursor-pointer">
                    {comm.user}
                  </span>
                  <div className="flex-1">
                    <p className="text-on-surface-variant">{comm.text}</p>
                    <span className="text-[9px] text-on-surface-variant/40 mt-0.5 block">{comm.time}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Like/Comments Stats Bar */}
          <div className="border-t border-primary/5 pt-4 space-y-3">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <button
                  onClick={handleLikeToggle}
                  className={`flex items-center gap-1.5 transition-all cursor-pointer p-1 rounded hover:bg-primary/5 ${
                    hasLiked ? 'text-rose-600' : 'text-primary/60 hover:text-primary'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${hasLiked ? 'fill-current' : ''}`} />
                  <span className="font-sans text-xs font-bold">{likesCount} likes</span>
                </button>
                <div className="flex items-center gap-1.5 text-primary/60 p-1">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-sans text-xs font-bold">{commentsList.length} comments</span>
                </div>
              </div>
            </div>

            {/* Write a comment form */}
            <form onSubmit={handleSendComment} className="flex gap-2">
              <input
                type="text"
                placeholder="Add a culinary comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="flex-1 bg-surface-container-low border-0 border-b border-primary/20 focus:border-secondary focus:ring-0 py-2.5 px-3 text-xs text-primary transition-all rounded placeholder:text-on-surface-variant/40"
              />
              <button
                type="submit"
                className="p-2.5 bg-primary hover:bg-primary-container text-white rounded transition-all cursor-pointer"
                title="Post comment"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
