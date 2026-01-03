
import { PlaceHolderImages } from "./placeholder-images";

export type Mirror = {
  id: string;
  name: string;
  shape: 'round' | 'rectangle' | 'oval' | 'arched' | 'sunburst' | 'full-length';
  dimensions: string;
  frame: string;
  price: number;
  originalPrice?: number;
  image: (typeof PlaceHolderImages)[0];
};

export const mirrors: Mirror[] = [
  {
    id: 'aura-round',
    name: 'Aura Round',
    shape: 'round',
    dimensions: '80cm Diameter',
    frame: 'Thin Black Metal',
    price: 225,
    originalPrice: 250,
    image: PlaceHolderImages.find(p => p.id === 'round-mirror')!,
  },
  {
    id: 'elysia-rectangle',
    name: 'Elysia Rectangle',
    shape: 'rectangle',
    dimensions: '60cm x 90cm',
    frame: 'Brushed Gold',
    price: 320,
    image: PlaceHolderImages.find(p => p.id === 'rectangle-mirror')!,
  },
  {
    id: 'sol-oval',
    name: 'Sol Oval',
    shape: 'oval',
    dimensions: '50cm x 100cm',
    frame: 'Frameless',
    price: 280,
    image: PlaceHolderImages.find(p => p.id === 'oval-mirror')!,
  },
  {
    id: 'arc-entryway',
    name: 'Arc Entryway',
    shape: 'arched',
    dimensions: '70cm x 100cm',
    frame: 'Matte Black',
    price: 315,
    originalPrice: 350,
    image: PlaceHolderImages.find(p => p.id === 'arched-mirror')!,
  },
  {
    id: 'helios-sunburst',
    name: 'Helios Sunburst',
    shape: 'sunburst',
    dimensions: '90cm Diameter',
    frame: 'Antique Gold',
    price: 420,
    image: PlaceHolderImages.find(p => p.id === 'sunburst-mirror')!,
  },
  {
    id: 'terra-full-length',
    name: 'Terra Full Length',
    shape: 'full-length',
    dimensions: '80cm x 180cm',
    frame: 'Natural Oak Wood',
    price: 495,
    originalPrice: 550,
    image: PlaceHolderImages.find(p => p.id === 'full-length-mirror')!,
  },
];

export const getMirrorById = (id: string) => {
  return mirrors.find((mirror) => mirror.id === id);
}
