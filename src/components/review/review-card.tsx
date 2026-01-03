
import { Star } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { GlassCard } from '@/components/ui/glass-card';
import type { Review } from '@/lib/reviews';

type ReviewCardProps = {
  review: Review;
};

export function ReviewCard({ review }: ReviewCardProps) {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('');
  };

  return (
    <GlassCard className="flex h-full flex-col p-6">
      <div className="flex items-center gap-4">
        <Avatar>
          <AvatarImage src={review.avatar} alt={review.author} />
          <AvatarFallback>{getInitials(review.author)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="font-semibold text-foreground">{review.author}</p>
          <div className="flex items-center">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < review.rating ? 'fill-primary text-primary' : 'fill-muted text-muted-foreground'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="mt-4 flex-grow">
        <h4 className="font-headline text-lg font-medium text-foreground">{review.title}</h4>
        <p className="mt-1 text-muted-foreground">{review.comment}</p>
      </div>
      <p className="mt-4 text-right text-xs text-muted-foreground">{new Date(review.date).toLocaleDateString()}</p>
    </GlassCard>
  );
}
