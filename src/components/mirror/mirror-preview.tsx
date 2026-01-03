import Image from 'next/image';
import { cn } from '@/lib/utils';
import { type Mirror } from '@/lib/mirrors';
import { GlassCard } from '../ui/glass-card';

type MirrorPreviewProps = {
  mirror: Mirror;
};

export function MirrorPreview({ mirror }: MirrorPreviewProps) {
  const shapeClasses = {
    round: 'rounded-full aspect-square',
    rectangle: 'rounded-lg aspect-[3/4]',
    oval: 'rounded-[50%] aspect-[2/3]',
    arched: 'rounded-t-full aspect-[3/4]',
    sunburst: 'rounded-full aspect-square',
    'full-length': 'rounded-lg aspect-[9/16]',
  };
  const imageUrl = new URL(mirror.image.imageUrl);

  return (
    <GlassCard className="p-4 md:p-8 shine">
       <div className={cn(
           "relative w-full overflow-hidden",
           shapeClasses[mirror.shape]
         )}>
        <Image
          src={imageUrl.href}
          alt={mirror.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority
          data-ai-hint={mirror.image.imageHint}
        />
       </div>
    </GlassCard>
  );
}
