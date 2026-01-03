
'use client';

import * as React from 'react';
import { useSearchParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { type Locale } from '@/i18n';
import { type Mirror } from '@/lib/mirrors';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MirrorCard } from '@/components/mirror/mirror-card';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { offers, type Offer } from '@/lib/offers';

type ProductListProps = {
  mirrors: Mirror[];
  locale: Locale;
  dictionary: any;
};

export function ProductList({ mirrors, locale, dictionary }: ProductListProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedShape, setSelectedShape] = React.useState('all');
  const [priceRange, setPriceRange] = React.useState([0, 600]);
  const [onSale, setOnSale] = React.useState(searchParams.get('on_sale') === 'true');
  
  const offerParam = searchParams.get('offer');
  const [activeOffer, setActiveOffer] = React.useState<Offer | null>(null);

  React.useEffect(() => {
    const saleParam = searchParams.get('on_sale') === 'true';
    setOnSale(saleParam);
  }, [searchParams]);

  React.useEffect(() => {
    if (offerParam) {
      const foundOffer = offers.find(o => o.id === offerParam);
      setActiveOffer(foundOffer || null);
    } else {
      setActiveOffer(null);
    }
  }, [offerParam]);

  const shapes = ['all', ...Array.from(new Set(mirrors.map((m) => m.shape)))];

  const getForcedDiscountPercentage = (mirror: Mirror) => {
    if (activeOffer && activeOffer.type === 'forced_discount') {
      if (activeOffer.appliesTo.includes('all') || activeOffer.appliesTo.includes(mirror.shape)) {
        return activeOffer.discountPercentage;
      }
    }
    return 0;
  };

  const filteredMirrors = React.useMemo(() => {
    return mirrors.filter((mirror) => {
      const forcedDiscountPercentage = getForcedDiscountPercentage(mirror);
      const currentPrice = forcedDiscountPercentage > 0 
        ? mirror.price * (1 - forcedDiscountPercentage / 100) 
        : mirror.price;
      
      const matchesSearch =
        mirror.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        mirror.image.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesShape = selectedShape === 'all' || mirror.shape === selectedShape;
      const matchesPrice = currentPrice >= priceRange[0] && currentPrice <= priceRange[1];
      
      const matchesSale = onSale ? mirror.originalPrice && mirror.originalPrice > mirror.price : true;

      return matchesSearch && matchesShape && matchesPrice && matchesSale;
    });
  }, [mirrors, searchTerm, selectedShape, priceRange, onSale, activeOffer]);
  

  return (
    <div>
      <div className="mb-8 flex flex-col gap-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
                placeholder={dictionary.ProductsPage.searchPlaceholder}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 h-12 text-base"
            />
            </div>
            <Tabs value={selectedShape} onValueChange={setSelectedShape} className="w-full overflow-x-auto">
            <TabsList>
                {shapes.map((shape) => (
                <TabsTrigger key={shape} value={shape} className="capitalize px-4 py-2 text-sm">
                    {shape === 'all' ? dictionary.ProductsPage.allShapes : shape}
                </TabsTrigger>
                ))}
            </TabsList>
            </Tabs>
        </div>
        <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
            <div className="w-full md:max-w-md space-y-4">
                <Label htmlFor="price-range" className="font-medium">{dictionary.ProductsPage.priceRange}</Label>
                <div className='flex items-center gap-4'>
                    <Slider
                        id="price-range"
                        min={0}
                        max={600}
                        step={10}
                        value={priceRange}
                        onValueChange={(value) => setPriceRange(value)}
                        className="flex-1"
                    />
                    <div className="font-semibold text-primary w-28 text-center">
                        ${priceRange[0]} - ${priceRange[1]}
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch id="on-sale" checked={onSale} onCheckedChange={setOnSale} />
              <Label htmlFor="on-sale" className="font-medium">{dictionary.ProductsPage.onSale}</Label>
            </div>
        </div>
      </div>

      {activeOffer && activeOffer.type === 'forced_discount' && (
        <div className="mb-8 p-4 rounded-lg bg-accent text-accent-foreground">
          <h3 className="font-semibold">{dictionary.Offers[activeOffer.id as keyof typeof dictionary.Offers]?.title}</h3>
          <p>{dictionary.Offers[activeOffer.id as keyof typeof dictionary.Offers]?.description}</p>
        </div>
      )}

      {filteredMirrors.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredMirrors.map((mirror) => (
            <MirrorCard 
              key={mirror.id} 
              mirror={mirror} 
              locale={locale} 
              dictionary={dictionary} 
              forcedDiscountPercentage={getForcedDiscountPercentage(mirror)}
              offerId={activeOffer?.id}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">{dictionary.ProductsPage.noResults}</p>
        </div>
      )}
    </div>
  );
}

