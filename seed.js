const bcrypt = require('bcrypt');
const Deal = require('./models/Deal');
const User = require('./models/User');
const Tip = require('./models/Tip');

const seedDeals = [
    {
        title: 'Super Laptop Deal',
        description: 'An amazing discount on a high-end laptop. 50% off!',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Electronics',
        score: 50
    },
    {
        title: 'Free Coffee Coupon',
        description: 'Get a free coffee at any participating store.',
        imageUrl: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Food & Drink',
        score: 5
    },
    {
        title: 'Bad Haircut Voucher',
        description: 'Pay full price for a terrible haircut.',
        imageUrl: 'https://images.unsplash.com/photo-1593699199629-9293113b3f67?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Services',
        score: -20
    }
];

const seedTips = [
    {
        url: 'https://www.mediaexpert.pl/agd/odkurzacze/promocja-50',
        message: 'Odkurzacz Dyson V15 za pol ceny! Promocja tylko do konca tygodnia.',
        email: 'janek@example.com',
        status: 'new'
    },
    {
        url: 'https://www.x-kom.pl/laptopy/dell-xps-15',
        message: 'Dell XPS 15 z i7 i 16GB RAM za 3999 zl - najnizsza cena w historii.',
        status: 'new'
    },
    {
        url: 'https://www.zalando.pl/nike-air-max-90.html',
        message: 'Nike Air Max 90 w super cenie, dodatkowe -20% z kodem EXTRA20.',
        email: 'kasia@example.com',
        status: 'processed'
    },
    {
        url: 'https://www.empik.com/kindle-paperwhite',
        message: 'Kindle Paperwhite 2024 za 449 zl zamiast 649 zl. Swietna okazja na prezent!',
        status: 'new'
    },
    {
        url: 'https://www.rossmann.pl/promocje/kosmetyki',
        message: 'Rossmann -55% na kosmetyki do makijazu, startuje w poniedzialek.',
        email: 'ola@example.com',
        status: 'rejected'
    }
];

async function seed() {
    // Deals
    const dealCount = await Deal.countDocuments();
    if (dealCount === 0) {
        await Deal.insertMany(seedDeals);
        console.log(`[seed] Created ${seedDeals.length} deals.`);
    }

    // User
    const existingUser = await User.findOne({ email: 'admin@test.pl' });
    if (!existingUser) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);
        await User.collection.insertOne({
            name: 'Admin',
            email: 'admin@test.pl',
            password: hashedPassword
        });
        console.log('[seed] User created: admin@test.pl / admin123');
    }

    // Tips
    const tipCount = await Tip.countDocuments();
    if (tipCount === 0) {
        await Tip.insertMany(seedTips);
        console.log(`[seed] Created ${seedTips.length} tips.`);
    }
}

module.exports = seed;
