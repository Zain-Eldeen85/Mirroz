
export type Review = {
    id: string;
    author: string;
    avatar: string;
    rating: number;
    title: string;
    comment: string;
    date: string;
    mirrorId: string;
};

export const reviews: Review[] = [
    {
        id: 'review-1',
        author: 'Jessica P.',
        avatar: '/avatars/01.png',
        rating: 5,
        title: 'Absolutely stunning!',
        comment: 'The Aura Round mirror is the perfect centerpiece for my living room. The quality is exceptional and it was delivered so quickly. Highly recommend Mirroz!',
        date: '2024-05-15',
        mirrorId: 'aura-round',
    },
    {
        id: 'review-2',
        author: 'Mark T.',
        avatar: '/avatars/02.png',
        rating: 5,
        title: 'Elegant and Modern',
        comment: 'I bought the Elysia Rectangle mirror and it has completely transformed my hallway. The brushed gold frame is so elegant. A fantastic purchase.',
        date: '2024-05-12',
        mirrorId: 'elysia-rectangle',
    },
    {
        id: 'review-3',
        author: 'Sarah L.',
        avatar: '/avatars/03.png',
        rating: 4,
        title: 'Beautiful minimalist design',
        comment: 'The Sol Oval mirror is beautiful in its simplicity. It was a bit tricky to hang because it\'s frameless, but it looks amazing on the wall.',
        date: '2024-05-10',
        mirrorId: 'sol-oval',
    },
    {
        id: 'review-4',
        author: 'David Chen',
        avatar: '/avatars/04.png',
        rating: 5,
        title: 'Perfect for the entryway',
        comment: 'The Arc Entryway mirror makes such a statement. I get compliments on it all the time. The matte black frame is very chic. 10/10!',
        date: '2024-05-08',
        mirrorId: 'arc-entryway',
    },
    {
        id: 'review-5',
        author: 'Emily R.',
        avatar: '/avatars/05.png',
        rating: 5,
        title: 'A true work of art',
        comment: 'The Helios Sunburst mirror is more than just a mirror, it\'s a piece of art. It adds so much character to my dining room. I\'m in love!',
        date: '2024-05-05',
        mirrorId: 'helios-sunburst',
    },
    {
        id: 'review-6',
        author: 'Michael B.',
        avatar: '/avatars/06.png',
        rating: 5,
        title: 'Amazing quality full-length mirror',
        comment: 'I was looking for a high-quality full-length mirror and the Terra model is perfect. The oak wood frame is solid and beautifully crafted.',
        date: '2024-05-02',
        mirrorId: 'terra-full-length',
    },
];

