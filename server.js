const stripe = require('stripe')(
  'sk_test_51Lkm1EGpoH2TKkngkt2dywQYxCNHZQxr9pstQZGXhRDNwFs10L17LSU1Ax16S8jOLu1sRsPu9r8nKDf5fopDR1Aq00dGmDguDV',
);

const express = require('express');
const app = express();
app.use(express.static('public'));

const YOUR_DOMAIN = 'http://localhost:3000';

app.post('/product1', async (req, res) => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    shipping_address_collection: {
      allowed_countries: ['US', 'CA'],
    },

    line_items: [
      {
        price: 'price_1Lkm6GGpoH2TKkng9Jfy27il',
        quantity: 1,
      },
    ],
    mode: 'payment',
    success_url: `${YOUR_DOMAIN}/success.html`,
    cancel_url: `${YOUR_DOMAIN}/cancel.html`,
  });

  res.redirect(303, session.url);
});

app.listen(4000, () => console.log('Running on port 4000'));
