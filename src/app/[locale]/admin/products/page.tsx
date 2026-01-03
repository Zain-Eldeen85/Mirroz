
import { GlassCard } from '@/components/ui/glass-card';

export default function AdminProductsPage() {
  return (
    <GlassCard className="p-8 md:p-12">
      <h1 className="font-headline text-4xl font-semibold tracking-tight text-foreground sm:text-5xl">
        Manage Products
      </h1>
      <p className="mt-4 text-lg text-muted-foreground">
        This is a placeholder page for managing products.
      </p>
    </GlassCard>
  );
}
