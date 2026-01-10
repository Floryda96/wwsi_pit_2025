const mongoose = require('mongoose');
const Deal = require('./models/Deal');

mongoose.connect('mongodb://localhost/Projekt')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!!!');
    })
    .catch(err => {
        console.log(err);
    });

const seedDeals = [
    {
        title: 'Super Laptop Deal',
        description: 'An amazing discount on a high-end laptop. 50% off!',
        imageUrl: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
        category: 'Electronics',
        score: 50 // Hot
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
        score: -20 // Cold
    }
];

const seedDB = async () => {
    await Deal.deleteMany({});
    await Deal.insertMany(seedDeals);
    console.log("Database seeded!");
};

seedDB().then(() => {
    mongoose.connection.close();
});
