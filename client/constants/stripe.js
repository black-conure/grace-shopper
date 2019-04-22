const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production'
  ? 'pk_test_CgcWi6xhZ8WdfeOt1qeKK6kV00K3dC78b8'
  : 'pk_test_CgcWi6xhZ8WdfeOt1qeKK6kV00K3dC78b8';

export default STRIPE_PUBLISHABLE;
