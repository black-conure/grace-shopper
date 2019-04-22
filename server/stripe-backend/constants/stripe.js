const configureStripe = require('stripe');

const STRIPE_SECRET_KEY = process.env.NODE_ENV === 'production'
    ? 'sk_test_OhLL3ZQSZMZx3FLu7oCxK9fI00CFIWgIFI'  //BOTH ARE TEST KEYS
    : 'sk_test_OhLL3ZQSZMZx3FLu7oCxK9fI00CFIWgIFI';

const stripe = configureStripe(STRIPE_SECRET_KEY);

module.exports = stripe;
