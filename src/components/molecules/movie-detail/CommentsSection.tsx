import React from 'react';
import { MessageCircle, User } from 'lucide-react';

export interface Comment {
  id: number;
  author: string;
  rating: number;
  date: string;
  text: string;
}

interface CommentsSectionProps {
  comments?: Comment[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  return (
    <section className="rounded-2xl bg-primary-light  p-6 shadow-[8px_8px_16px_rgba(0,0,0,0.3),-8px_-8px_16px_rgba(255,255,255,0.05)] h-full flex flex-col">
      <h2 className="text-lg font-bold text-text-primary mb-4 flex items-center gap-2">
        <MessageCircle className="w-5 h-5 text-primary" />
        نظرات کاربران
      </h2>
      
      <div className="flex-1 overflow-y-auto max-h-[500px]">
        {comments && comments.length > 0 ? (
          <div className="space-y-3">
            {comments.map((comment) => (
              <div
                key={comment.id}
                className="bg-surface rounded-xl p-4 shadow-[4px_4px_8px_rgba(0,0,0,0.25),-4px_-4px_8px_rgba(255,255,255,0.03)] hover:shadow-[6px_6px_12px_rgba(0,0,0,0.3),-6px_-6px_12px_rgba(255,255,255,0.05)] transition-all"
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-surface shadow-[inset_3px_3px_6px_rgba(0,0,0,0.3),inset_-3px_-3px_6px_rgba(255,255,255,0.04)] flex items-center justify-center">
                      <User className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-text-primary">{comment.author}</p>
                      <p className="text-xs text-text-secondary">{comment.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-0.5">
                    {Array.from({ length: comment.rating }).map((_, i) => (
                      <span key={i} className="text-primary text-sm">⭐</span>
                    ))}
                  </div>
                </div>
                <p className="text-sm text-text-secondary leading-relaxed">{comment.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-center">
            <div className="w-16 h-16 rounded-full bg-surface shadow-[inset_6px_6px_12px_rgba(0,0,0,0.3),inset_-6px_-6px_12px_rgba(255,255,255,0.04)] flex items-center justify-center mb-3">
              <MessageCircle className="w-8 h-8 text-primary/40" />
            </div>
            <p className="text-text-secondary/60 text-sm">
              هنوز نظری ثبت نشده است
            </p>
            <p className="text-text-secondary/40 text-xs mt-1">
              اولین نفری باشید که نظر می‌دهد
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default CommentsSection;

