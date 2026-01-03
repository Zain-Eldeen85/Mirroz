import { GlassCard } from "@/components/ui/glass-card";
import { Skeleton } from "@/components/ui/skeleton";

export function MirrorCardSkeleton() {
  return (
    <GlassCard className="overflow-hidden">
      <Skeleton className="h-auto w-full aspect-[4/5]" />
      <div className="p-6">
        <Skeleton className="h-6 w-3/4 rounded-md" />
        <Skeleton className="mt-3 h-4 w-full rounded-md" />
        <Skeleton className="mt-1 h-4 w-5/6 rounded-md" />
        <div className="mt-4 flex items-center justify-between">
          <Skeleton className="h-7 w-1/4 rounded-md" />
          <Skeleton className="h-9 w-2/5 rounded-md" />
        </div>
      </div>
    </GlassCard>
  );
}
